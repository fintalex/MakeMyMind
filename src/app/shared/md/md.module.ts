import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChip, MatChipsModule, 
    MatMenuModule, MatDialogModule, MatCheckboxModule, MatFormFieldModule, 
    MatAutocompleteModule, MatRadioModule,
    MatBottomSheetModule, MatTooltipModule, MatSidenavModule
     } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';  
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, 
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule, MatCheckboxModule, MatFormFieldModule, MatExpansionModule,
    MatAutocompleteModule, MatBottomSheetModule, MatRadioModule, MatTooltipModule,
    MatSidenavModule, MatSnackBarModule, MatSlideToggleModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule,
    MatGridListModule, MatListModule, MatSelectModule, MatChipsModule, MatMenuModule, 
    MatDialogModule,  MatCheckboxModule, MatFormFieldModule, MatExpansionModule,
    MatAutocompleteModule, MatBottomSheetModule, MatRadioModule, MatTooltipModule,
    MatSidenavModule, MatSnackBarModule, MatSlideToggleModule
  ]
})
export class MdModule { }
