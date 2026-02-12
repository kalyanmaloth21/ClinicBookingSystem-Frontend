import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DoctorsComponent } from './doctors.component';
import { AddDoctorComponent } from './add-doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent
  }
];

@NgModule({
  declarations: [
    DoctorsComponent,
    AddDoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorsModule { }
