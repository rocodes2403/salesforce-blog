import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Blog } from '../../models/blog.interface';
import { BlogService } from '../../service/blog.service';
import {take, takeUntil} from "rxjs/operators";
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent {

  constructor(private editDialog: MatDialog,
    private blogService: BlogService) { }

  @Input()
  blog!: Blog;
  
  @Output()
  refreshBlogs: EventEmitter<Blog> = new EventEmitter<Blog>()

  editBlog(blogItem: Blog) {
    this.editDialog.open(UpdateBlogComponent, {
      width: '60vw',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: blogItem
    }).afterClosed().subscribe(updatedBlog => {
      if(updatedBlog) {
        this.blogService.updateBlog(updatedBlog).pipe(take(1)).subscribe(data => {
          this.refreshBlogs.emit();
        });
      }
    })
  }

  deleteBlog(blogItem: Blog) {
    this.blogService.deleteBlog(blogItem.id).pipe(take(1)).subscribe(data => {
      this.refreshBlogs.emit();
    });
  }

}
