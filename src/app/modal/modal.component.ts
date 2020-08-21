import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ApiServiceService } from '../service/api-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  heading: string;
  content: any;
  url = this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:5000/static/scenes/0bbhtvtsnmhpeoejptojh.mp4");

  constructor(public modalRef: MDBModalRef, private apiService: ApiServiceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.apiService.emitUrl().subscribe(result => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(result.url);
    });
  }

}
