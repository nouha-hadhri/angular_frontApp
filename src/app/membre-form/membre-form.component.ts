import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MembreService } from '../services/membre.service';
import { ActivatedRoute, Router } from '@angular/router';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-membre-form',
  templateUrl: './membre-form.component.html',
  styleUrls: ['./membre-form.component.css']
})
export class MembreFormComponent {
photoFile!: File | null;
photoPreview: string | ArrayBuffer | null = null;
encadrants: any[] = [];
form!: FormGroup;
isEditMode = false;
//injection de dependeances
  constructor(private MS:MembreService, private router: Router, 
    private activatedRoute:ActivatedRoute) { }
   //declaration du form group

  //initialisation du form 
  ngOnInit() {
  // 1️⃣ Initialisation du form
  this.form = new FormGroup({
    cin: new FormControl(null, Validators.required),
    nom: new FormControl(null),
    prenom: new FormControl(null),
    dateNaissance: new FormControl(null),
    email: new FormControl(null),
    type: new FormControl(null),
    cv: new FormControl(null),
    photo: new FormControl(null),
    createDate: new FormControl(null),
    // ETUDIANT
    dateInscription: new FormControl(null),
    diplome: new FormControl(null),
    encadrant: new FormControl(null), // juste null à l'initialisation
    // ENSEIGNANT
    grade: new FormControl(null),
    etablissement: new FormControl(null)
  });

  // 2️⃣ Récupération des encadrants
  this.MS.getEncadrants().subscribe(data => {
    this.encadrants = data;

    // si tu veux activer le champ seulement si il y a au moins un encadrant
    if (this.encadrants.length > 0) {
      this.form.get('encadrant')?.enable();
    } else {
      this.form.get('encadrant')?.disable();
    }
  });

  // 3️⃣ Récupération id pour mode édition
  const idCourant = this.activatedRoute.snapshot.params['id'];
  if (idCourant) {
    this.isEditMode = true;
    this.MS.GetMemberById(idCourant).subscribe(data => {
      this.form.patchValue({
        cin: data.cin,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        email: data.email,
        type: data.type,
        cv: data.cv,
        photo: data.photo,
        dateInscription: data.dateInscription || null,
        diplome: data.diplome,
        encadrant: data.encadrant || null,
        grade: data.grade,
        etablissement: data.etablissement
      });

      if (data.photo) {
        this.photoPreview = 'data:image/jpeg;base64,' + data.photo;
      }
    });
  }
}

async onPhotoSelected(event: Event) {
 const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    // ✅ Compression de l'image
    const options = {
      maxSizeMB: 0.5,          // Taille max 500KB
      maxWidthOrHeight: 800,   // Dimension max
      useWebWorker: true
    };
    
    const compressedFile = await imageCompression(file, options);
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.photoFile = compressedFile;
      this.photoPreview = reader.result as string;
      this.form.patchValue({ photo: base64 });
    };
    reader.readAsDataURL(compressedFile);
    
  } catch (error) {
    console.error('Erreur compression:', error);
  }
}
compareEncadrants(e1: any, e2: any): boolean {
  return e1 && e2 ? e1.id === e2.id : e1 === e2;
}

  //recurperation des donnees 
sub() {
  if (this.form.invalid) return;

  const typeForm = this.form.value.type;
  const idCourant = this.activatedRoute.snapshot.params['id'];
  console.log('encadrant:', this.form.value.encadrant);
  // ✅ Préparer les données ETUDIANT
  const dataEtudiant = {
    cin: this.form.value.cin,
    nom: this.form.value.nom,
    prenom: this.form.value.prenom,
    dateNaissance: this.form.value.dateNaissance,
    email: this.form.value.email,
    photo: this.form.value.photo || null,
    cv: this.form.value.cv || null,
    dateInscription: this.form.value.dateInscription || null,
    diplome: this.form.value.diplome || null,
    // ✅ IMPORTANT : Envoyer l'objet encadrant complet, pas juste l'ID
    encadrant: this.form.value.encadrant || null
  };

  // ✅ Préparer les données ENSEIGNANT
  const dataEnseignant = {
    cin: this.form.value.cin,
    nom: this.form.value.nom,
    prenom: this.form.value.prenom,
    dateNaissance: this.form.value.dateNaissance,
    email: this.form.value.email,
    photo: this.form.value.photo || null,
    cv: this.form.value.cv || null,
    grade: this.form.value.grade || null,
    etablissement: this.form.value.etablissement || null
  };

  if (this.isEditMode) {
    // MODE MODIFICATION
    if (typeForm === 'ETUDIANT') {
      console.log('dataEtudiant:', dataEtudiant);
      this.MS.updateEtudiant(idCourant, dataEtudiant).subscribe({
        next: () => this.router.navigate(['']),
        error: err => console.error('Erreur update étudiant:', err)
      });
    } else if (typeForm === 'ENSEIGNANTCHERCHEUR') {
      this.MS.updateEnseignant(idCourant, dataEnseignant).subscribe({
        next: () => this.router.navigate(['']),
        error: err => console.error('Erreur update enseignant:', err)
      });
    }
    return;
  }

  // MODE AJOUT
  if (typeForm === 'ETUDIANT') {
    this.MS.addEtudiant(dataEtudiant).subscribe(() => this.router.navigate(['']));
  } else if (typeForm === 'ENSEIGNANTCHERCHEUR') {
    this.MS.addEnseignant(dataEnseignant).subscribe(() => this.router.navigate(['']));
  }
}
}