import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getBlogs(): Observable<Blog[]> {
    const apiUrl = `${environment.apiEndpoint}`;
    return this.http.get<Blog[]>(apiUrl).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Error: ${error}!!!`);
      return of([])
    }))
  }

  getBlogById(blogId: any): Observable<Blog|null> {
    const apiUrl = `${environment.apiEndpoint}/${blogId}`;
    return this.http.get<Blog>(apiUrl).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Error: ${error}!!!`);
      throw new Error("ERR_NO_BLOG");
    }));
  }

  updateBlog(updatedBlog: Blog): Observable<Blog> {
    const apiUrl = `${environment.apiEndpoint}/${updatedBlog.id}`;
    return this.http.post<Blog>(apiUrl, updatedBlog).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Sorry! Couldn't save at this moment. Please try later.`);
      throw new Error("UPDATE_FAILED");
    }));
  }

  createBlog(newBlog: Blog): Observable<Blog> {
    const apiUrl = `${environment.apiEndpoint}`;
    return this.http.post<Blog>(apiUrl, newBlog).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Sorry! Couldn't create at this moment. Please try later.`);
      throw new Error("UPDATE_FAILED");
    }));
  }

  deleteBlog(blogId: number) {
    const apiUrl = `${environment.apiEndpoint}/${blogId}`;
    return this.http.delete(apiUrl).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Sorry! Couldn't create at this moment. Please try later.`);
      throw new Error("UPDATE_FAILED");
    }));
  }

  deleteAllBlog() {
    const apiUrl = `${environment.apiEndpoint}`;
    return this.http.delete(apiUrl).pipe(map(data => data), catchError((error) => {
      this.snackBar.open(`Sorry! Couldn't create at this moment. Please try later.`);
      throw new Error("UPDATE_FAILED");
    }));
  }
  
}
