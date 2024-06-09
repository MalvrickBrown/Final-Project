import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private API_URL = environment.api_url + '/api/v1/Book';
  constructor(private _http: HttpClient) { }

  makeBooking(data: any):Observable<any> {
    return this._http.post<any>(this.API_URL + '/booking', data)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }

  viewRentalBooking(id: number):Observable<any>{
    return this._http.get<any>(this.API_URL + `/viewRentalBooking/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }
  
  getReservations():Observable<any> {
    return this._http.get<any>('http://localhost:8888/api/v1/Book/allReservation')
      .pipe(
        map((res) =>{
          return res
        })
      );
  }
  
  updateBooking(id: number, data: any):Observable<any>{
    return this._http.patch(this.API_URL + `/updateReservations/${id}`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }

  removeReservation(id: number):Observable<any> {
    return this._http.delete<any>(this.API_URL + `/removeReservations/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }
}
