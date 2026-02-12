import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './add-patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent
  }
];

@NgModule({
  declarations: [
    PatientsComponent,
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientsModule { }
