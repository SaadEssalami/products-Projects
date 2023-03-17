import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../models/products';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() id : number | undefined ;
  @Input() myProduct : Products | undefined
  @Output() deleteProducts = new EventEmitter()

  eventRemove(id :any){
    this.deleteProducts.emit({id : id , message: 'ok'})
  }
}
