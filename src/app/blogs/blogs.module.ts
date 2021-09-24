import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailsComponent,
    BlogItemComponent,
    UpdateBlogComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class BlogsModule { }
