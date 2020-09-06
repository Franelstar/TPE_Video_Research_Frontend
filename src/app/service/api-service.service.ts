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
  private subjectUrl = new Subject<any>();

  old_search_data: FormData;
  old_search_fonction: number;

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

  public getSearch(data: FormData, page=1) {
    this.subject.next({ recherche: true });
    this.old_search_fonction = 1;
    this.old_search_data = data;
    this.http.post<any>(`${environment.apiUrl}search?page=${page}`, data).subscribe(result => {
      this.subject.next({ result: result, etat: true });
    }, (err: any) => {
      this.subject.next({ result: err, etat: false });
    });
  }

  public getSearchText(data: FormData, page=1) {
    this.subject.next({ recherche: true });
    this.old_search_fonction = 2;
    this.old_search_data = data;
    this.http.post<any>(`${environment.apiUrl}text_search?page=${page}`, data).subscribe(result => {
      this.subject.next({ result: result, etat: true });
    }, (err: any) => {
      this.subject.next({ result: err, etat: false });
    });
  }

  public oldSearch(page: number) {
    if(this.old_search_fonction == 1) {
      this.getSearch(this.old_search_data, page)
    } else {
      this.getSearchText(this.old_search_data, page)
    }
  }

  emitSearch(): Observable<any>{
    return this.subject.asObservable();
  }

  emitUrl(): Observable<any>{
    return this.subjectUrl.asObservable();
  }

  setUrl(url: string): void {
    this.subjectUrl.next({ url: url});
  }

}
