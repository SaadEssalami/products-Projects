import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {path: "" , component: HomeComponent},
  {path: "product" ,component: ProductsComponent } ,
  {path:"category" , component: CategoriesComponent},
  {path: "tag" , component: TagsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
