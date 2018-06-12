import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChip, MatChipsModule, 
    MatMenuModule, MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule
     } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';  

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule, MatExpansionModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule,
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule, MatExpansionModule
  ]
})
export class MdModule { }
