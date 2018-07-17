import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChip, MatChipsModule, 
    MatMenuModule, MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule, MatAutocompleteModule
     } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';  

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule, MatExpansionModule,
    MatAutocompleteModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule,
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule, MatTooltipModule, MatCheckboxModule, MatFormFieldModule, MatExpansionModule,
    MatAutocompleteModule
  ]
})
export class MdModule { }
