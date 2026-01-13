import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent {

  form!: FormGroup;
  isEditMode = false;
 

  constructor(
    private PS: PublicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    // 🔹 Initialisation du formulaire
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      titre: new FormControl(null, Validators.required),
      lien: new FormControl(null),
      sourcePDF: new FormControl(null),
      datePublication: new FormControl(null)
    });

   
    

    // 🔹 Mode édition
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (idCourant) {
      this.isEditMode = true;
      this.PS.GetPublicationById(idCourant).subscribe(data => {
        this.form.patchValue({
          type: data.type,
          titre: data.titre,
          lien: data.lien,
          sourcePDF: data.sourcePDF,
          datePublication: data.date,
        });
      });
    }
  }

  

  // 🔹 soumission
  sub() {
  if (this.form.invalid) return;

  const idCourant = this.activatedRoute.snapshot.params['id'];
  const now = new Date();

  // convertir datePublication en Date ou ISO string
  const datePub = this.form.value.datePublication
    ? new Date(this.form.value.datePublication)
    : now;

  const publication: any = {
    type: this.form.value.type,
    titre: this.form.value.titre,
    lien: this.form.value.lien,
    sourcePDF: this.form.value.sourcePDF,
    date: `${datePub.getFullYear()}-${(datePub.getMonth()+1).toString().padStart(2,'0')}-${datePub.getDate().toString().padStart(2,'0')}`, // yyyy-MM-dd
  };

  if (this.isEditMode) {
    publication.updatedAt = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    console.log('Updating publication:', publication);
    this.PS.updatePublication(idCourant, publication).subscribe({
      next: () => this.router.navigate(['/publications']),
      error: err => console.error('Erreur update publication:', err)
    });
    return;
  }

  // Mode ajout
  publication.createdAt = publication.updatedAt = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;

  console.log('Adding publication:', publication);
  this.PS.addPublication(publication).subscribe(() => {
    this.router.navigate(['/publications']);
  });
}

}
