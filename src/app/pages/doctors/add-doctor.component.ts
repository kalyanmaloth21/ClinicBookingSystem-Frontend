import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {

  constructor(private http: HttpClient) {}

  @Output() onDoctorAdded = new EventEmitter<void>();

  doctor = {
    name: '',
    specialization: '',
    phoneNumber: '',
    email: ''
  };

  onSubmit(form: NgForm): void {

    // 🔴 Highlight all fields if invalid
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    // ✅ Call API only if valid
    this.http.post('http://localhost:5042/api/Doctors', this.doctor)
      .subscribe({
        next: (response) => {
          console.log('Doctor saved:', response);
          alert('Doctor added successfully!');
          this.onDoctorAdded.emit();
          this.resetForm();
          form.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to save doctor');
        }
      });
  }

  resetForm(): void {
    this.doctor = { 
      name: '', 
      specialization: '', 
      phoneNumber: '', 
      email: '' 
    };
  }
}
