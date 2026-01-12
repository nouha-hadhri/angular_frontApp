import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent implements OnInit {
  outilForm!: FormGroup;
  photoPreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.outilForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      photo: [null]
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.outilForm.patchValue({ photo: file });
    }
  }

  onSubmit(): void {
    if (this.outilForm.valid) {
      console.log('Form Value:', this.outilForm.value);
      // TODO: Send data to service
      this.resetForm();
    }
  }

  resetForm(): void {
    this.outilForm.reset();
    this.photoPreview = null;
  }

  get name() {
    return this.outilForm.get('name');
  }

  get description() {
    return this.outilForm.get('description');
  }

  get type() {
    return this.outilForm.get('type');
  }

  get category() {
    return this.outilForm.get('category');
  }
}
