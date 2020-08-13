import { Routes } from '@angular/router';
import { DesktopComponent } from '../desktop/desktop.component';
import { CategoryComponent } from '../category/category.component';


export const allroutes: Routes = [
  { path: 'desktop', component: DesktopComponent},
  { path: 'category', component: CategoryComponent},
];
  