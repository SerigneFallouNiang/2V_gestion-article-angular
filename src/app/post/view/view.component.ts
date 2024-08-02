import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

  

import { PostService } from '../post.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
id! :number;
post!: Post;

comments: any[] = [];

constructor(

  public postService: PostService,

  private route: ActivatedRoute,

 ) { }

 ngOnInit(): void {

  this.id = this.route.snapshot.params['postId'];

  this.postService.find(this.id).subscribe((data: Post)=>{
    this.post = data;
    this.loadComments();
  })    
}

loadComments(): void {
  this.postService.getComments(this.id).subscribe((data: any[]) => {
    this.comments = data;
  });
}

}
