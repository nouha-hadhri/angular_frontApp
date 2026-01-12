import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent implements OnInit {

  evenementForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      id: ['', Validators.required],
      titre: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      lieu: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      console.log('Form Value:', this.evenementForm.value);
      // TODO : envoyer les données au service backend
      this.resetForm();
    }
  }

  resetForm(): void {
    this.evenementForm.reset();
  }

  // Getters pour le template
  get id() { return this.evenementForm.get('id'); }
  get titre() { return this.evenementForm.get('titre'); }
  get date() { return this.evenementForm.get('date'); }
  get lieu() { return this.evenementForm.get('lieu'); }

}
