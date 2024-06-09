import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private API_URL = environment.api_url + '/api/v1/Book';
  constructor(private _http: HttpClient) { }

  //Create Booking/Reservation Function being called from the backend
  makeBooking(data: any):Observable<any> {
    return this._http.post<any>(this.API_URL + '/booking', data)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }

  //View Reservation Function being called from the backend
  viewRentalBooking(id: number):Observable<any> {
    return this._http.get<any>(this.API_URL + `/viewRentalBooking/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }

  //Get all Booking/Reservation Function being called from the backend
  getReservations():Observable<any> {
    return this._http.get<any>(this.API_URL + `/allReservation`)
      .pipe(
        map((res) =>{
          return res
        })
      );
  }

  //Update Booking/Reservation Function being called from the backend
  updateBooking(id: number, data: any):Observable<any>{
    return this._http.patch(this.API_URL + `/updateReservations/${id}`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }

  //Remove Booking/Reservation Function being called from the backend
  removeReservation(id: number):Observable<any> {
    return this._http.delete<any>(this.API_URL + `/removeReservations/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }
  
  autoUpdateCustomers(data: any):Observable<any>{
    return this._http.post<any>(this.API_URL + `/customers`, data)
    .pipe(
      map((res ) =>{
        return res
      })
    );
  }
}
