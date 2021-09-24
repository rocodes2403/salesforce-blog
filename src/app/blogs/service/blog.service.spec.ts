import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BlogService } from './blog.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('BlogService', () => {
  let blogService: BlogService;

  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        BlogService,
        {
          provide: HttpClient,
          useValue: httpSpy
        }
      ]
    });
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    blogService = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(blogService).toBeTruthy();
  });

  it('Should return blogs when getBlogs method is called', () => {
    const mockBlogs = [{
      "id": 2665,
      "title": "Test Create",
      "text": "Blog content",
      "timestamp": "2021-09-24T19:20:25.881Z"
    }, {
      "id": 2666,
      "title": "Test 2 - Update blog",
      "text": "Blog content 2",
      "timestamp": "2021-09-24T19:20:46.681Z"
    }, {
      "id": 2667,
      "title": "Test-3 Heading",
      "text": "Test-3 Content",
      "timestamp": "2021-09-24T19:47:42.185Z"
    }]

    http.get.and.returnValue(of(mockBlogs));

    blogService.getBlogs().subscribe(
      blogs => {
        expect(blogs.length).toEqual(3);
      }
    );

    expect(http.get).toHaveBeenCalled();
  })

});
