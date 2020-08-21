import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../service/api-service.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  resultat: any;
  scene_url: any;
  modalRef: MDBModalRef;

  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {
        heading: 'Modal heading',
        content: { url: '', description: 'Content description'}
    }
  }

  constructor(private apiService: ApiServiceService,private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.emitSearch().subscribe(result => {
      console.log(result)
      if(result.etat) {
        this.resultat = result.result;
      } else {
        this.resultat = 'Une erreur est survenue'
      }
    }, (err: any) => {
      console.log(err);
    });

    this.modalService.opened.subscribe(() => this.apiService.setUrl(this.scene_url));
  }

  openModal(scene_url: any, titre_video: any) {
    this.scene_url = scene_url;
    //this.apiService.setUrl(scene_url);
    this.modalOptions.data.content.url = scene_url;
    this.modalOptions.data.heading = titre_video;
    this.modalRef = this.modalService.show(ModalComponent, this.modalOptions);
  }

}
