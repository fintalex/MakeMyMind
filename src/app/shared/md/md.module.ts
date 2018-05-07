import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChip, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule, MatCheckboxModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule, MatCheckboxModule
  ]
})
export class MdModule { }
