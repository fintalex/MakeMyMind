import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChip, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, MatDialogModule, MatTooltipModule
  ]
})
export class MdModule { }
