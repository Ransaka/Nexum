import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditDetailsComponent, UserprofileComponent],
  imports: [CommonModule, RouterModule]
})
export class PagesModule {}
