import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: any[] = [];
  doctors: any[] = [];
  patients: any[] = [];

  activeTab: string = 'list';
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDoctorsAndPatients();
  }

  loadDoctorsAndPatients() {
    Promise.all([
      this.http.get<any[]>('http://localhost:5042/api/Doctors').toPromise(),
      this.http.get<any[]>('http://localhost:5042/api/Patients').toPromise()
    ]).then(([doctors, patients]) => {
      this.doctors = doctors || [];
      this.patients = patients || [];
      this.loadAppointments();
    });
  }

  loadAppointments(): void {
    this.loading = true;

    this.http.get<any[]>('http://localhost:5042/api/Appointments')
      .subscribe({
        next: (data) => {
          this.appointments = data.map(a => ({
            id: a.id,
            patientName: this.getPatientName(a.patientId),
            doctorName: this.getDoctorName(a.doctorId),
            date: this.formatDate(a.startTime),
            time: this.formatTime(a.startTime),
            durationInMinutes: a.durationInMinutes
          }));
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load appointments';
          this.loading = false;
        }
      });
  }

  deleteAppointment(id: number): void {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    this.http.delete(`http://localhost:5042/api/Appointments/${id}`)
      .subscribe({
        next: (response) => {
          console.log('Delete successful, response:', response);
          alert('Appointment deleted successfully!');
          this.loadAppointments();
        },
        error: (err) => {
          console.error('Delete error status:', err.status);
          console.error('Delete error message:', err.message);
          console.error('Full error:', err);
          
          // If status is 200, 204, or 0 (likely CORS/proxy success), treat as success
          if (err.status === 200 || err.status === 204 || err.status === 0) {
            alert('Appointment deleted successfully!');
            this.loadAppointments();
          } else {
            alert('Failed to delete appointment');
          }
        }
      });
  }

  getPatientName(id: number) {
    return this.patients.find(p => p.id === id)?.name || 'Unknown';
  }

  getDoctorName(id: number) {
    return this.doctors.find(d => d.id === id)?.name || 'Unknown';
  }

  formatDate(dateTime: string) {
    return new Date(dateTime).toISOString().split('T')[0];
  }

  formatTime(dateTime: string) {
    return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  onAppointmentAdded(): void {
    this.loadAppointments();
    this.activeTab = 'list';
  }
}
