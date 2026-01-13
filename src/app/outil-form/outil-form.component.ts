import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilService } from '../services/outil.service';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent {

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private OS: OutilService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // 🔹 Initialisation du formulaire
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required),
    });

    // 🔹 Mode édition
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (idCourant) {
      this.isEditMode = true;
      this.OS.GetOutilById(idCourant).subscribe(data => {
        if (data.date) {
          const d = new Date(data.date);
          const formattedDate = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
          this.form.patchValue({
            date: formattedDate,
            source: data.source
          });
        } else {
          this.form.patchValue({
            date: null,
            source: data.source
          });
        }
      });
    }
  }

  // 🔹 Soumission
  sub() {
    if (this.form.invalid) return;

    const idCourant = this.activatedRoute.snapshot.params['id'];

    // 🔹 La date est maintenant directement yyyy-MM-dd
    const dateInput = this.form.value.date ? new Date(this.form.value.date) : new Date();
    const dateOutil = `${dateInput.getFullYear()}-${(dateInput.getMonth()+1).toString().padStart(2,'0')}-${dateInput.getDate().toString().padStart(2,'0')}`;

    const outil: any = {
      date: dateOutil,
      source: this.form.value.source
    };

    if (this.isEditMode) {
      console.log('Updating outil:', idCourant, outil);
      this.OS.updateOutil(idCourant, outil).subscribe({
        next: () => this.router.navigate(['/outils']),
        error: err => console.error('Erreur update outil:', err)
      });
      return;
    }

    console.log('Adding outil:', outil);
    this.OS.addOutil(outil).subscribe(() => {
      this.router.navigate(['/outils']);
    });
  }
}
