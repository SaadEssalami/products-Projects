import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Products } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private productsservice: ProductsService) {}
  product : Products[] = []

  search : string =""

  word : Products[] =[]

 ngOnInit(): void {
    this.productsservice.getAllProducts().subscribe((product: Products[] ) => {
    this.product = product
   })
 }

//  removeProduct(id: number | undefined){
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.productsservice.deletProduct(id).subscribe(() => {
//         this.product = this.product.filter(pro => pro.id !== id)
//       })
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })
  
  
// }
 removeEvent(data: any){
  this.productsservice.deletProduct(data.id).subscribe(() => {
    this.product = this.product.filter(pro => pro.id !== data.id)
  })
 }

 searchProducts(){
  this.word = (this.search) ? this.product.filter(product => product.productName?.toLowerCase().includes(this.search.toLowerCase()) )  
  :  this.product
  this.search= ""
 }
  
}
