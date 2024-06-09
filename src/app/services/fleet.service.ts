import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private API_URL = environment.api_url + '/api/v1/Rental';

  constructor(private _http: HttpClient) { }


  // Full fleet of vehicles
  getRentals():Observable<any> {
    return this._http.get<any>(this.API_URL + '/all-fleet')
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }

  // Get Single Rental Function being called from the backend
  getRental(id: number):Observable<any> {
    return this._http.get<any>(this.API_URL + `/getRental/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }

  //Create Rental Function being called from the backend
  addToFleet(data: any):Observable<any> {
    return this._http.post<any>(this.API_URL + `/add-rental`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }

  //Update Rental Function being called from the backend
  updateFleet(id: number, data: any):Observable<any>{
    return this._http.patch<any>(this.API_URL + `/updateRental/${id}`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }

  //Remove Rental Function being called from the backend
  removeRental(id: number):Observable<any> {
    return this._http.delete<any>(this.API_URL + `/removeRental/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }

  
  //Function to change avaiblity of Rental being called from the backend
  availableRental(id: number, data:any):Observable<any> {
    return this._http.patch<any>(this.API_URL + `/availableRental/${id}`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }
}
