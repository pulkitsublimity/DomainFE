import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

let components = [MatTooltipModule,MatCheckboxModule,MatExpansionModule,MatButtonModule,MatInputModule,MatToolbarModule,MatGridListModule,MatIconModule,MatMenuModule,MatDividerModule,MatSidenavModule,MatSelectModule,MatTableModule, MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule];
@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    components,
  ],
  exports: [components]
})
export class MaterialModule { }
