import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogService } from '../../service/blog.service';

import { BlogItemComponent } from './blog-item.component';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('BlogItemComponent', () => {
  let component: BlogItemComponent;
  let fixture: ComponentFixture<BlogItemComponent>;

  let blogServiceSpy : SpyObj<BlogService>;

  const mockBlog = {
    id: 2665,
    title: "Test Create",
    text: "Blog content",
    timestamp: new Date("2021-09-24T19:20:25.881Z")
  }

  beforeEach(async () => {
    const serviceSpyObj = createSpyObj('BlogService', ['updateBlog']) 
    await TestBed.configureTestingModule({
      imports:[MatDialogModule, MatCardModule, MatIconModule, RouterTestingModule],
      declarations: [ BlogItemComponent ],
      providers: [
        {
          provide: BlogService,
          useValue: serviceSpyObj
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockBlog
        }
      ]
    })
    .compileComponents();
    blogServiceSpy = TestBed.inject(BlogService) as SpyObj<BlogService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogItemComponent);
    component = fixture.componentInstance;
    component.blog = mockBlog;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
