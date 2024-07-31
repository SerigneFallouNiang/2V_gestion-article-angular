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

//l'id de la modification
  // id!: number;

  // // Variable de stock pour le update
  // post!: Post;

 
  constructor(public postService: PostService,) {  }
      
  ngOnInit(): void {

  //récupération des dnnées
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })  


  //Récupération des données par l'id
    // this.id = this.route.snapshot.params['postId'];
    // this.postService.find(this.id).subscribe((data: Post)=>{
    //   this.post = data;

    // }); 

    //Soummission des données dans le formulaire
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

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
          // Ajouter le nouveau post au début du tableau
          this.posts.unshift(res);
          // Réinitialiser le formulaire
          this.form.reset();
        // alert('Ajout avec success')
    })

  }

  
}