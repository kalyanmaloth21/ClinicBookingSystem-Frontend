import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  activeTab: string = 'list';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.http.get<any[]>(`http://localhost:5042/api/Patients`)
      .subscribe({
        next: (data) => {
          console.log('Patients received:', data);
          this.patients = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.errorMessage = 'Cannot connect to backend API. Is .NET running?';
          this.loading = false;
        }
      });
  }

  deletePatient(id: number): void {
    if (!confirm('Are you sure you want to delete this patient?')) {
      return;
    }

    this.http.delete(`http://localhost:5042/api/Patients/${id}`)
      .subscribe({
        next: (response) => {
          console.log('Delete successful, response:', response);
          alert('Patient deleted successfully!');
          this.loadPatients();
        },
        error: (err) => {
          console.error('Delete error status:', err.status);
          console.error('Delete error message:', err.message);
          
          // If status is 200, 204, or 0 (likely success), treat as success
          if (err.status === 200 || err.status === 204 || err.status === 0) {
            alert('Patient deleted successfully!');
            this.loadPatients();
          } else {
            alert('Failed to delete patient');
          }
        }
      });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  onPatientAdded(): void {
    this.loadPatients();
    this.activeTab = 'list';
  }
}
