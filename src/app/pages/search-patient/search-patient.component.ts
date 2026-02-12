import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent {

  idNumber: string = '';
  patientData: any = null;
  searched: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSearch(): void {

    if (!this.idNumber) {
      alert('Please enter an id number');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.patientData = null;
    this.searched = false;

    // ✅ Call backend API (adjust endpoint if needed)
    this.http.get<any>(`http://localhost:5042/api/Patients/${this.idNumber}`)
      .subscribe({
        next: (data) => {
          this.patientData = data;
          this.searched = true;
          this.loading = false;
        },
        error: (err) => {
          console.error('Search failed', err);
          this.searched = true;
          this.patientData = null;
          this.errorMessage = 'No patient found with the given file number';
          this.loading = false;
        }
      });
  }

  resetSearch(): void {
    this.idNumber = '';
    this.patientData = null;
    this.searched = false;
    this.errorMessage = '';
    this.loading = false;
  }
}
