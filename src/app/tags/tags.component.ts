import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Tags } from '../models/tags';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements  OnInit{

  constructor(private tagsservice: TagsService){ }

  tags: Tags[]= [] ;

  tag :Tags = {
    tagName: '',
  }

  editTag : boolean = false;
  hideForm = true
  

  ngOnInit(): void {
    this.tagsservice.getAllTags().subscribe((res :Tags[]) => {
      this.tags = res
    })
  }

  addTags(){
    this.tagsservice.postTag(this.tag).subscribe((res : Tags) => {
      this.tags = [...this.tags , res];
      this.initTAgs();
      this.hideForm = false
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your tags has been saved',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  initTAgs(){
    this.tag = {
      tagName : ""
    }
  }

  editTags(data: Tags){
    this.tag = data;
    this.editTag = true;
    this.hideForm = true
  }

  updateTag(){
    this.tagsservice.putTag(this.tag.id, this.tag).subscribe(() => {
      this.editTag =false;
      this.initTAgs();
      this.hideForm = false
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your tags has been updated',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  removeTag(id: number |undefined){
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
        this.tagsservice.deleteTags(id).subscribe(() => {
          this.tags = this.tags.filter(tags => tags.id !== id)
        })
        Swal.fire(
          'Deleted!',
          'Your tags has been deleted.',
          'success'
        )
      }
    })
    
  }
}
