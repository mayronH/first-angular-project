import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Comment } from '../interfaces/Comment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseAPIUrl = environment.baseAPIUrl;
  private apiURL = `${this.baseAPIUrl}api/moments`;

  constructor(private http: HttpClient) {}

  addComment(comment: Comment): Observable<Response<Comment>> {
    return this.http.post<Response<Comment>>(
      `${this.apiURL}/${comment.momentId}/comments`,
      comment
    );
  }
}
