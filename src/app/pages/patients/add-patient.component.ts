import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  constructor(private http: HttpClient) {}

  @Output() onPatientAdded = new EventEmitter<void>();

  patient = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    age: '',
    gender: ''
  };

  onSubmit(): void {

  const patientData = {
    name: this.patient.name,
    email: this.patient.email,
    phoneNumber: this.patient.phone,
    dateOfBirth: this.patient.dateOfBirth,
    age: this.calculateAge(this.patient.dateOfBirth),
    gender: this.patient.gender
  };

  this.http.post('http://localhost:5042/api/Patients', patientData)
    .subscribe({
      next: (response) => {
        console.log('Saved to backend:', response);
        alert('Patient registered successfully!');
        this.onPatientAdded.emit();
        this.resetForm();
      },
      error: (err) => {
        console.error('POST Error:', err);
        alert('Failed to save patient. Check backend.');
      }
    });
}
  calculateAge(dateOfBirth: string): number {

  if (!dateOfBirth) return 0;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}



  resetForm(): void {
    this.patient = { name: '', email: '', phone: '', dateOfBirth: '', age: '', gender: '' };
  }
}
