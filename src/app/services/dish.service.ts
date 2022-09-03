import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(BaseUrl + 'dishes')
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(BaseUrl + 'dishes/' + id)
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(BaseUrl + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]))
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http
      .put<Dish>(BaseUrl + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(
        catchError((error) => this.processHTTPMsgService.handleError(error))
      );
  }
}
