import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  isEditing: boolean = false;
  editingPostId: number | null = null;

 
  constructor(public postService: PostService) {  }
      
  ngOnInit(): void {

    this.loadPosts();
    this.initForm();

  // //récupération des dnnées
  //   this.postService.getAll().subscribe((data: Post[])=>{
  //     this.posts = data;
  //     console.log(this.posts);
  //   })  


  // //Récupération des données par l'id
  //   // this.id = this.route.snapshot.params['postId'];
  //   // this.postService.find(this.id).subscribe((data: Post)=>{
  //   //   this.post = data;

  //   // }); 

  //   //Soummission des données dans le formulaire
  //   this.form = new FormGroup({
  //     title: new FormControl('', [Validators.required]),
  //     body: new FormControl('', Validators.required)
  //   });
  }

  loadPosts(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  initForm(): void {
    this.form = new FormGroup({
          title: new FormControl('', [Validators.required]),
          body: new FormControl('', Validators.required)
        });
  }

  get f(){
    return this.form.controls;
  }
      
  deletePost(id:number){
    this.postService.delete(id).subscribe(res=>{
      this.posts = this.posts.filter(item=>item.id !== id);
      // alert("Article supprimée avec success")
    })
  }

  // submit(){
  //   console.log(this.form.value);
  //   this.postService.create(this.form.value).subscribe((res:any) => {
  //        console.log('Post created successfully!');
  //         // Ajouter le nouveau post au début du tableau
  //         this.posts.unshift(res);
  //         // Réinitialiser le formulaire
  //         this.form.reset();
  //       // alert('Ajout avec success')
  //   })

  // }

  submitForm(): void {
    if (this.form.valid) {
      if (this.isEditing) {
        this.updatePost();
      } else {
        this.createPost();
      }
    }
  }


  createPost(): void {
    this.postService.create(this.form.value).subscribe((res: Post) => {
      console.log('Post created successfully!');
      this.posts.unshift(res);
      this.resetForm();
    });
  }

  updatePost(): void {
    if (this.editingPostId) {
      const updatedPost = { ...this.form.value, id: this.editingPostId };
      this.postService.update(this.editingPostId, updatedPost).subscribe((res: Post) => {
        console.log('Post updated successfully!');
        const index = this.posts.findIndex(p => p.id === this.editingPostId);
        if (index !== -1) {
          this.posts[index] = res;
        }
        this.resetForm();
      });
    }
  }

  editPost(post: Post): void {
    this.isEditing = true;
    this.editingPostId = post.id;
    this.form.patchValue({
      title: post.title,
      body: post.body
    });
  }

  resetForm(): void {
    this.form.reset();
    this.isEditing = false;
    this.editingPostId = null;
  }

  
}