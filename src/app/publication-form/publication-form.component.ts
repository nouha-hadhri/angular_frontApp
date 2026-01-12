import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  publicationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.publicationForm = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      titre: ['', [Validators.required, Validators.minLength(3)]],
      lien: ['', [Validators.required, Validators.minLength(3)]],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.publicationForm.valid) {
      console.log('Form Value:', this.publicationForm.value);
      // TODO : envoyer les données au service backend
      this.resetForm();
    }
  }

  resetForm(): void {
    this.publicationForm.reset();
  }

  // Getters pour le template
  get id() { return this.publicationForm.get('id'); }
  get type() { return this.publicationForm.get('type'); }
  get titre() { return this.publicationForm.get('titre'); }
  get lien() { return this.publicationForm.get('lien'); }
  get createdAt() { return this.publicationForm.get('createdAt'); }
  get updatedAt() { return this.publicationForm.get('updatedAt'); }

}
