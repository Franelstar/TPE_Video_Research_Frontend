import { Component, OnInit } from '@angular/core';
import { Subscription, empty } from 'rxjs';
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
  resultat_error: any;
  resultat_vide: any;
  next: any;
  preview: any;
  list_page: any;
  resultat_total: any;
  scene_url: any;
  modalRef: MDBModalRef;
  charge = false;

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
        content: { url: '', titre: '', scene: 0, duree: 0, type1: '', type2: '', person: 0}
    }
  }

  constructor(private apiService: ApiServiceService,private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.subscription = this.apiService.emitSearch().subscribe(result => {
      this.resultat_error = null;
      this.resultat_vide = null;
      if(result.recherche) {
        this.charge = true;
        this.resultat = null;
      } else if(result.etat) {
        if(!result.result.data){
          this.resultat_vide = 'No results to display';
        }
        this.charge = false;
        this.next = result.result.next;
        this.preview = result.result.preview;
        this.list_page = result.result.list_page;
        this.resultat_total = result.result.resultat_total;
        this.resultat = result.result.data;
        this.smoothScrollTop();
      } else {
        this.charge = false;
        this.resultat_error = 'An error has occurred. Please try again !'
        this.smoothScrollTop();
      }
    }, (err: any) => {
      console.log(err);
    });

    this.modalService.opened.subscribe(() => this.apiService.setUrl(this.scene_url));
  }

  openModal(scene_url: any, titre_video: any, scene_number: any, duree: any, type1: any, type2: any, nbre_person: any) {
    this.scene_url = scene_url;
    //this.apiService.setUrl(scene_url);
    this.modalOptions.data.content.url = scene_url;
    this.modalOptions.data.heading = titre_video;
    this.modalOptions.data.content.titre = titre_video;
    this.modalOptions.data.content.scene = scene_number;
    this.modalOptions.data.content.duree = duree;
    this.modalOptions.data.content.type1 = type1;
    this.modalOptions.data.content.type2 = type2;
    this.modalOptions.data.content.person = nbre_person;
    this.modalRef = this.modalService.show(ModalComponent, this.modalOptions);
  }

  callPage(page): void {
    this.apiService.oldSearch(+page);
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
