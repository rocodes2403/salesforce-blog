import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Blog } from '../../models/blog.interface';


@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent {

  public blogData: Blog;

  constructor(public dialogRef: MatDialogRef<UpdateBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blog) {
      this.blogData = {...data}
  }

  cancelUpdate() {
    this.dialogRef.close()
  }

}
