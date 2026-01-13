import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent {

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private ES: EvenementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    // 🔹 Initialisation du formulaire
    this.form = new FormGroup({
      titre: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      lieu: new FormControl(null, Validators.required),
    });

    // 🔹 Mode édition
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (idCourant) {
      this.isEditMode = true;
      this.ES.GetEvenementById(idCourant).subscribe(data => {
        // patchValue pour remplir le formulaire
        if (data.date) {
          const d = new Date(data.date);
          const formattedDate = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
          this.form.patchValue({
            titre: data.titre,
            date: formattedDate,
            lieu: data.lieu
          });
        } else {
          this.form.patchValue({
            titre: data.titre,
            date: null,
            lieu: data.lieu
          });
        }
      });
    }
  }

  // 🔹 soumission
  sub() {
    if (this.form.invalid) return;

    const idCourant = this.activatedRoute.snapshot.params['id'];
    const now = new Date();

    // 🔹 Ajouter heure 00:00:00 pour correspondre à @JsonFormat
    const dateInput = this.form.value.date ? new Date(this.form.value.date) : now;
    const dateEvenement = `${dateInput.getFullYear()}-${(dateInput.getMonth()+1).toString().padStart(2,'0')}-${dateInput.getDate().toString().padStart(2,'0')} 00:00:00`;

    const evenement: any = {
      titre: this.form.value.titre,
      date: dateEvenement,
      lieu: this.form.value.lieu,
    };

    if (this.isEditMode) {
      console.log('Updating événement:', idCourant, evenement);
      this.ES.updateEvenement(idCourant, evenement).subscribe({
        next: () => this.router.navigate(['/evenements']),
        error: err => console.error('Erreur update événement:', err)
      });
      return;
    }

    console.log('Adding événement:', evenement);
    this.ES.addEvenement(evenement).subscribe(() => {
      this.router.navigate(['/evenements']);
    });
  }
}
