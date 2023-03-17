import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from '../models/category';
import { Products } from '../models/products';
import { Tags } from '../models/tags';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categorys: Category[] = [];

  tag: Tags[] = [];

  products: Products[] = [];

  product: Products = {
    productName: '',
    categoryName: '',
    tagName: '',
    category: undefined,
    tag: undefined,
    price: 0,
    tagId: undefined,
    categoryId: undefined,
    imageUrl: ''
  };

  edit : boolean = false;

  hideForm = true

  constructor(
    private tagsservice: TagsService,
    private categoryservice: CategoryService,
    private productsservice: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategorys();
    this.getTags();
    this.getProducts();
  }

  getCategorys() {
    this.categoryservice.getAllCategorys().subscribe((res: Category[]) => {
      this.categorys = res;
    });
  }

  getTags() {
    this.tagsservice.getAllTags().subscribe((res: Tags[]) => {
      this.tag = res;
    });
  }

  getProducts() {
    this.productsservice.getAllProducts().subscribe((res: Products[]) => {
      this.products = res;
    });
  }

  addProduct() {
    this.productsservice.postProduct(this.product).subscribe((res: Products) => {
        this.getProducts()
        this.initProducts();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your product has been saved',
          showConfirmButton: false,
          timer: 1000
        })
        this.hideForm= false;
      });
  }

  initProducts() {
    this.product = {
      productName: '',
      imageUrl : '',
      categoryName: '',
      tagName: '',
      category: undefined,
      tag: undefined,
      price: 0,
    };
  }

  editProducts(data: Products){
    this.product = data
    this.edit = true;
    this.hideForm= true
  }

  updateProducts(){
    this.productsservice.putProduct(this.product.id , this.product).subscribe(() => {
      this.getProducts();
      this.edit = false;
      this.initProducts();
      this.hideForm = false;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your product has been updated',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  removeProduct(id: number | undefined){
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
        this.productsservice.deletProduct(id).subscribe(() => {
          this.products = this.products.filter(pro => pro.id !== id)
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
    
  }
}
