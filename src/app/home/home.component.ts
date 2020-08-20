import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  resultat: any;

  constructor(private apiService: ApiServiceService) { }

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
  }

}
