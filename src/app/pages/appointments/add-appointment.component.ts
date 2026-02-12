import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  constructor(private http: HttpClient) {}

  @Output() onAppointmentAdded = new EventEmitter<void>();

  appointment = {
    patientId: '',
    doctorId: '',
    date: '',
    startTime: '',
    endTime: '',
    reason: '',
    durationInMinutes: 0
  };

  doctors: any[] = [];
  patients: any[] = [];

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
  }

  loadDoctors(): void {
    this.http.get<any[]>('http://localhost:5042/api/Doctors')
      .subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Error loading doctors', err)
      });
  }

  loadPatients(): void {
    this.http.get<any[]>('http://localhost:5042/api/Patients')
      .subscribe({
        next: (data) => this.patients = data,
        error: (err) => console.error('Error loading patients', err)
      });
  }

  calculateEndTime(): void {
    if (!this.appointment.startTime || this.appointment.durationInMinutes <= 0) {
      this.appointment.endTime = '';
      return;
    }

    const [startHour, startMinute] = this.appointment.startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = startTotalMinutes + this.appointment.durationInMinutes;

    const endHour = Math.floor(endTotalMinutes / 60) % 24;
    const endMinute = endTotalMinutes % 60;

    this.appointment.endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
  }

  onSubmit(form: NgForm): void {

    // 🔴 Highlight fields if invalid
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    // Ensure endTime is calculated
    this.calculateEndTime();

    // ✅ Combine date + time into DateTime format for API
    const appointmentPayload = {
      patientId: parseInt(this.appointment.patientId),
      doctorId: parseInt(this.appointment.doctorId),
      startTime: `${this.appointment.date}T${this.appointment.startTime}`,
      endTime: `${this.appointment.date}T${this.appointment.endTime}`,
      durationInMinutes: this.appointment.durationInMinutes,
      reason: this.appointment.reason
    };

    this.http.post(`http://localhost:5042/api/Appointments`, appointmentPayload)
      .subscribe({
        next: (response) => {
          console.log('Appointment booked:', response);
          alert('Appointment booked successfully!');
          this.onAppointmentAdded.emit();
          this.resetForm();
          form.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to book appointment');
        }
      });
  }

  resetForm(): void {
    this.appointment = { 
      patientId: '', 
      doctorId: '', 
      date: '', 
      startTime: '', 
      endTime: '',
      reason: '',
      durationInMinutes: 0
    };
  }
}
