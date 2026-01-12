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
    this.initializeForm();
  }

  initializeForm(): void {
    this.publicationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      contenu: ['', [Validators.required, Validators.minLength(10)]],
      auteur: ['', [Validators.required, Validators.minLength(3)]],
      categorie: ['', Validators.required],
      tags: ['', Validators.required],
      datePublication: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.publicationForm.valid) {
      console.log('Form Value:', this.publicationForm.value);
      // TODO: Send data to service
      this.resetForm();
    }
  }

  resetForm(): void {
    this.publicationForm.reset();
  }

  get titre() {
    return this.publicationForm.get('titre');
  }

  get contenu() {
    return this.publicationForm.get('contenu');
  }

  get auteur() {
    return this.publicationForm.get('auteur');
  }

  get categorie() {
    return this.publicationForm.get('categorie');
  }

  get tags() {
    return this.publicationForm.get('tags');
  }

  get datePublication() {
    return this.publicationForm.get('datePublication');
  }
}
