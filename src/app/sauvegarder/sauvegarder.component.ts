import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-sauvegarder',
  templateUrl: './sauvegarder.component.html',
  styleUrls: ['./sauvegarder.component.scss']
})
export class SauvegarderComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = [];
  messageErreur = '';
  etape1 = false;
  etape2 = true;
  etape3 = false;
  etape4 = false;
  resultat: any;
  images_sauv = 'http://127.0.0.1:5000/static/images/';
  video: any;

  constructor(private apiServiceService: ApiServiceService, private headerSerice: HeaderService) { }

  ngOnInit(): void {
    /* this.apiServiceService.postVideo().subscribe(
      (res: any) => {
        // Store the access token in the localstorage
        console.log(res);
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        console.log(err);
      }); */

    this.headerSerice.setStatusHeader(false);
    this.etape1 = false;
    this.etape2 = true;
    this.etape3 = false;
    this.etape4 = false;
    this.resultat = null;
    this.video = null;
    this.files  = [];
    this.smoothScrollTop();
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.apiServiceService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            if (Math.round(event.loaded * 100 / event.total) == 100){
              file.inProgress = false;
              this.etape2 = false;
              this.etape3 = true;
            }
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        this.messageErreur = 'An error has occurred on the server';
        this.etape1 = false;
        this.etape2 = true;
        this.etape3 = false;
        this.files  = [];
        return of(`${file.data.name} upload failed.`);
      })).subscribe((rep: any) => {
        if (typeof (rep) === 'object') {
          console.log(rep.body);
          if (typeof (rep.body[0].Erreur) !== 'undefined') {
            file.inProgress = false;
            this.messageErreur = rep.body[0].Erreur;
            this.etape1 = false;
            this.etape2 = true;
            this.etape3 = false;
            this.files  = [];
          } else {
            this.resultat = rep.body[0].scenes;
            this.video = rep.body[0].video;
            console.log(this.video);
            this.etape4 = true;
          }
        }
      }, (err: any) => {
        file.inProgress = false;
        this.etape1 = false;
        this.etape2 = true;
        this.etape3 = false;
        this.files  = [];
        this.messageErreur = 'The file could not be saved';
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.etape1 = true;
      this.messageErreur = '';
      for (let index = 0; index < fileUpload.files.length; index++){
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private smoothScrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
