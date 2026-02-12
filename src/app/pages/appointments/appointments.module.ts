import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { AddAppointmentComponent } from './add-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent
  }
];

@NgModule({
  declarations: [
    AppointmentsComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentsModule { }
