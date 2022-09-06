import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { BaseUrl } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  processHTTPMsgService: ProcessHTTPMsgService;

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(BaseUrl + 'promotions')
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion>(BaseUrl + 'promotions/' + id)
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion[]>(BaseUrl + 'promotions?featured=true')
      .pipe(map((promotions) => promotions[0]))
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }
}
