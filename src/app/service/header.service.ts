import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private subject = new Subject<boolean>();
  private isRecherche = true;

  constructor() { }

  statusHeader(): void{
    this.subject.next(this.isRecherche);
  }

  setStatusHeader(isAuth: boolean): void {
    this.isRecherche = isAuth;
    this.statusHeader();
  }

  emitStatusHeader(): Observable<boolean>{
    return this.subject.asObservable();
  }
}
