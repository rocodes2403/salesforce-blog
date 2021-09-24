import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blog } from '../../models/blog.interface';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  blogList!: Blog[];
  isLoading = true;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.refreshBlogs();
  }

  refreshBlogs() {
    this.isLoading = true;
    this.blogService.getBlogs().pipe(takeUntil(this.destroy$)).subscribe(blogsData => {
      this.isLoading = false;
      this.blogList = blogsData;
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();    
  }

}