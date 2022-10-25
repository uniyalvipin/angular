import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(BaseUrl + 'leadership')
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(BaseUrl + 'leadership/' + id)
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(BaseUrl + 'leadership?featured=true')
      .pipe(map((leaders) => leaders[0]))
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }
}
