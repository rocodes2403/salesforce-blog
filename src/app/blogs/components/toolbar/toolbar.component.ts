import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BlogService } from '../../service/blog.service';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() enableHomeButton = false;

  @Output()
  refreshBlogs: EventEmitter<any> = new EventEmitter<any>()

  constructor(private updateBlog: MatDialog,
    private blogService: BlogService,
    private router: Router) { }

  createBlog() {
    this.updateBlog.open(UpdateBlogComponent, {
      width: '60vw',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: {}
    }).afterClosed().subscribe(updatedBlog => {
      if(updatedBlog) {
        this.blogService.createBlog(updatedBlog).pipe(take(1)).subscribe(newBlog => {
          const url = `/blog.html/${newBlog.id}`;
          this.router.navigateByUrl(url).then();
        });
      }
    })
  }

  deleteAllBlog() {
    this.blogService.deleteAllBlog().pipe(take(1)).subscribe(data => {
      this.refreshBlogs.emit();
    });
  }
}
