import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  processHTTPMsgService: ProcessHTTPMsgService;

  constructor(private http: HttpClient) {}

  postFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http
      .post<Feedback>(BaseUrl + 'feedback', feedback, httpOptions)
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }
}
