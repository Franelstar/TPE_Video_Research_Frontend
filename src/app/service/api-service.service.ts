import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  postVideo(): Observable<any> {
    return this.http.post(`${environment.apiUrl}Name/anael`, {

    }).pipe(
    retry(2)
    );
  }

  public upload(formData: FormData) {

    return this.http.post<any>(`${environment.apiUrl}upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }

  public getParams() {

    return this.http.get<any>(`${environment.apiUrl}home`);
  }

  public getSearch(data: FormData) {
    this.http.post<any>(`${environment.apiUrl}search`, data).subscribe(result => {
      this.subject.next({ result: result, etat: true });
    }, (err: any) => {
      this.subject.next({ result: err, etat: false });
    });
  }

  emitSearch(): Observable<any>{
    return this.subject.asObservable();
  }

}
