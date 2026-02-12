import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any[] = [];
  activeTab: string = 'list';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {

    this.loading = true;
    this.errorMessage = '';

    // calling backend using proxy
    this.http.get<any[]>('http://localhost:5042/api/Doctors')
      .subscribe({
        next: (data) => {
          this.doctors = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading doctors:', err);
          this.errorMessage = 'Failed to load doctors from server';
          this.loading = false;
        }
      });
  }

  deleteDoctor(id: number): void {
    if (!confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    this.http.delete(`http://localhost:5042/api/Doctors/${id}`)
      .subscribe({
        next: (response) => {
          console.log('Delete successful, response:', response);
          alert('Doctor deleted successfully!');
          this.loadDoctors();
        },
        error: (err) => {
          console.error('Delete error status:', err.status);
          console.error('Delete error message:', err.message);
          
          // If status is 200, 204, or 0 (likely success), treat as success
          if (err.status === 200 || err.status === 204 || err.status === 0) {
            alert('Doctor deleted successfully!');
            this.loadDoctors();
          } else {
            alert('Failed to delete doctor');
          }
        }
      });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  onDoctorAdded(): void {
    // reload doctors after add
    this.loadDoctors();
    this.activeTab = 'list';
  }
}
