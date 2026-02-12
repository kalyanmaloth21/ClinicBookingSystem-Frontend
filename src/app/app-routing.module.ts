import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'doctors',
    loadChildren: () => import('./pages/doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./pages/patients/patients.module').then(m => m.PatientsModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'search-patient',
    loadChildren: () => import('./pages/search-patient/search-patient.module').then(m => m.SearchPatientModule)
  },
  {
    path: '',
    redirectTo: '/doctors',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
