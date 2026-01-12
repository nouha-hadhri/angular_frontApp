import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent implements OnInit {

  outilForm!: FormGroup;
  sources: string[] = ['interne', 'externe', 'automatique']; // liste déroulante

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.outilForm = this.fb.group({
      date: ['', Validators.required],
      source: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.outilForm.valid) {
      console.log('Form Value:', this.outilForm.value);
      // TODO : appeler le service pour enregistrer l'outil
      this.resetForm();
    }
  }

  resetForm(): void {
    this.outilForm.reset();
  }

  // Getters pour template
  get date() {
    return this.outilForm.get('date');
  }

  get source() {
    return this.outilForm.get('source');
  }

}
