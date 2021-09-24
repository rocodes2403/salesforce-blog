import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsModule } from './blogs/blogs.module';
import { BlogDetailsComponent } from './blogs/components/blog-details/blog-details.component';
import { BlogsComponent } from './blogs/components/blogs/blogs.component';

const routes: Routes = [
  {
    path: "blog.html",
    loadChildren: () => import('./blogs/blogs.module').then(m => BlogsModule),
    component: BlogsComponent
  },
  {
    path: 'blog.html/:blogId',
    data:{params: 'blogId'},
    component: BlogDetailsComponent
  },
  {
    path:'',
    redirectTo: 'blog.html',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
