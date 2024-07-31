import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  
  posts: Post[] = [];
  
  form!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService) {  }
      
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
      
  deletePost(id:number){
    this.postService.delete(id).subscribe(res=>{
      this.posts = this.posts.filter(item=>item.id !== id);
      alert("Article supprimée avec success")
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}