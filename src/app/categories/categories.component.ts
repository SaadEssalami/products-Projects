import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categorys: Category[] = [];

  categoryy : Category ={
    categoryName: ''
  }
  edit : boolean = false
  hideForm = true

  constructor(private categoryservice : CategoryService){ }
  ngOnInit(): void {
    this.categoryservice.getAllCategorys().subscribe((res: Category[]) => {
      this.categorys = res
    })
  }

  addCategory(){
    this.categoryservice.postCategory(this.categoryy).subscribe((res: Category) => {
      this.categorys = [...this.categorys, res];
      this.initCategory();
      this.hideForm = false
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your categories has been saved',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  initCategory(){
    this.categoryy = {
      categoryName: ''
    }
  }

  editCategory(data: Category){
    this.categoryy = data ;
    this.edit = true;
    this.hideForm = true
  }

  updateCategory(){
    this.categoryservice.putCategory(this.categoryy.id, this.categoryy).subscribe(() => {
      this.edit = true;
      this.initCategory();
      this.hideForm = false
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your categories has been updated',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  removeCategory(id: number |undefined){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryservice.delete(id).subscribe(() => {
          this.categorys = this.categorys.filter(cat => cat.id !== id);
        })
      }
    })
   
  }
}
