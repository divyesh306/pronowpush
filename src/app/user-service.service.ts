import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {

  }
  apiUrl = "https://nowpush-staging.herokuapp.com/api/v2/";
  // apiUrl = "http://localhost:4010/api/v2/";

  getUserByemail(email): Observable<any> {
    return this.http.get(this.apiUrl + "searchUser/" + email)
      .pipe(map((response: Response) => {
        return response;
      }))
  }

  stripePayment(data){
    return this.http.post(this.apiUrl + "switchpro",data)
    .pipe(map((response:Response) => {
      return response;
    }))
  }
}