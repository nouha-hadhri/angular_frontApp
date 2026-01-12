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
//injection de dependeances
  constructor(private MS:MembreService, private router: Router, 
    private activatedRoute:ActivatedRoute) { }
   //declaration du form group
  form!: FormGroup;
 isEditMode = false;
  //initialisation du form 
  ngOnInit(){
  // 1️⃣ Initialisation TOUJOURS du form
  this.form = new FormGroup({
    cin: new FormControl(null, Validators.required),
    nom: new FormControl(null),
    prenom: new FormControl(null),
    dateNaissance: new FormControl(null),
    email: new FormControl(null),
    type: new FormControl(null),
    cv: new FormControl(null),
    photo: new FormControl(null),
    createDate: new FormControl(null)
  });

  // 2️⃣ Récupération id
  const idCourant = this.activatedRoute.snapshot.params['id'];

  if (idCourant) {
    this.isEditMode = true;

    this.MS.GetMemberById(idCourant).subscribe(data => {

      // 3️⃣ patchValue (clé du problème)
      this.form.patchValue({
        cin: data.cin,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        email: data.email,
        type: data.type,
        cv: data.cv,
        photo: data.photo,
        createDate: data.createDate
      });

      // 4️⃣ photo preview
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

  //recurperation des donnees 
sub() {
  if (this.form.invalid) return;

  const type = this.form.value.type;
  const idCourant = this.activatedRoute.snapshot.params['id'];

  const data = {
    cin: this.form.value.cin,
    nom: this.form.value.nom,
    prenom: this.form.value.prenom,
    dateNaissance: this.form.value.dateNaissance,
    email: this.form.value.email,
    photo: this.form.value.photo || undefined
    
  };

  // 🟢 MODE MODIFICATION
  if (this.isEditMode) {
    if (type === 'ETUDIANT') {
    this.MS.updateEtudiant(idCourant, data).subscribe(() => {
      this.router.navigate(['']);
    });
  } 
  else if (type === 'ENSEIGNANT') {
    this.MS.updateEnseignant(idCourant, data).subscribe(() => {
      this.router.navigate(['']);
    });
  }
    return;
  }

  // 🟢 MODE AJOUT
  if (type === 'ETUDIANT') {
    this.MS.addEtudiant(data).subscribe(() => {
      this.router.navigate(['']);
    });
  } 
  else if (type === 'ENSEIGNANT') {
    this.MS.addEnseignant(data).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}




}
