import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blog } from '../../models/blog.interface';
import { BlogService } from '../../service/blog.service';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  blog!:null|Blog;
  private blogId: any;
  isLoading = true;

  private destroy$ = new Subject();

  constructor(private blogService: BlogService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private editDialog: MatDialog) { 
    this.blogId = route.snapshot.params.blogId
  }

  ngOnInit(): void {
    this.blogService.getBlogById(this.blogId).pipe(takeUntil(this.destroy$)).subscribe(blogData => {
      this.isLoading = false;
      this.blog = blogData;
    });
  }

  editBlog(blogItem: Blog) {
    this.editDialog.open(UpdateBlogComponent, {
      width: '60vw',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: blogItem
    }).afterClosed().subscribe(updatedBlog => {
      if(updatedBlog) {
        this.blogService.updateBlog(updatedBlog).subscribe(blogData => {
          this.blog = blogData;
        });
      }
    })
  }
  
}
