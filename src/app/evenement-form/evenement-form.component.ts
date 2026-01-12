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
    this.initializeForm();
  }

  initializeForm(): void {
    this.evenementForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      lieu: ['', [Validators.required, Validators.minLength(3)]],
      categorie: ['', Validators.required],
      nombreParticipants: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      console.log('Form Value:', this.evenementForm.value);
      // TODO: Send data to service
      this.resetForm();
    }
  }

  resetForm(): void {
    this.evenementForm.reset();
  }

  get titre() {
    return this.evenementForm.get('titre');
  }

  get description() {
    return this.evenementForm.get('description');
  }

  get date() {
    return this.evenementForm.get('date');
  }

  get lieu() {
    return this.evenementForm.get('lieu');
  }

  get categorie() {
    return this.evenementForm.get('categorie');
  }

  get nombreParticipants() {
    return this.evenementForm.get('nombreParticipants');
  }
}
