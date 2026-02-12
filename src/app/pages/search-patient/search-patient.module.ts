import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SearchPatientComponent } from './search-patient.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPatientComponent
  }
];

@NgModule({
  declarations: [
    SearchPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchPatientModule { }
