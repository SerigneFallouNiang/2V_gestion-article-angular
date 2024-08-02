import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from './post';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiURL = "https://jsonplaceholder.typicode.com";

 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  
  constructor(private httpClient: HttpClient) { }
    
  // fonction pour l'affichage
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/posts/')
  }


   // Nouvelle méthode pour obtenir les commentaires d'un post
   getComments(postId: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/posts/${postId}/comments`);
  }


// fonction pour la suppression
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
  }


  // fonction pour la modification
  update(id:number, post:Post): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
  }


  // fonction pour l'ajout
  create(post:Post): Observable<any> {
  
    return this.httpClient.post<any>(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
  
    // .pipe(
    //   catchError(this.errorHandler)
    // )
  }  



  // fonction pour le voir detail
  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/' + id)
  }

}