import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../service/header.service';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  dropdownListScenes = [];
  selectedItemsScenes = [];
  dropdownSettingsScenes = {};
  dropdownListObjets = [];
  selectedItemsObjets = [];
  dropdownSettingsObjets = {};

  file: File;

  value_search = "";

  etatHeader: boolean;
  subscription: Subscription;
  subscription_params: Subscription;

  url_logo = "assets/images/logo.jpeg";

  constructor(private headerService: HeaderService, private apiServiceService: ApiServiceService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription_params.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.headerService.emitStatusHeader().subscribe(etatHeader => {
      this.etatHeader = etatHeader;
    });
    this.headerService.statusHeader()
    this.getParams();

    this.dropdownSettingsScenes = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Toutes les scènes',
      unSelectAllText: 'Déselectionner tout',
      enableCheckAll: true,
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownSettingsObjets = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tous les objets',
      unSelectAllText: 'Déselectionner tout',
      enableCheckAll: true,
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.selectedItemsScenes = [];
    this.selectedItemsObjets = [];
  }

  recherche(): void {
    this.headerService.setStatusHeader(true);

    this.subscription_params = this.apiServiceService.getParams().subscribe((rep: any) => {
      // console.log(rep);
      if(typeof(rep.scenes) === 'object') {
        this.dropdownListScenes = [];

        for(var i in rep.scenes){
          this.dropdownListScenes.push({ item_id: i, item_text: rep.scenes[i] });
        }
      }

      if(typeof(rep.objets) === 'object') {
        this.dropdownListObjets = [];

        for(var i in rep.objets){
          this.dropdownListObjets.push({ item_id: i, item_text: rep.objets[i] });
        }
      }
    }, (err: any) => {
      console.log('erreur');
    });
  }

  getParams(): void {
    this.subscription_params = this.apiServiceService.getParams().subscribe((rep: any) => {
      // console.log(rep);
      if(typeof(rep.scenes) === 'object') {
        this.dropdownListScenes = [];

        for(var i in rep.scenes){
          this.dropdownListScenes.push({ item_id: i, item_text: rep.scenes[i] });
        }
      }

      if(typeof(rep.objets) === 'object') {
        this.dropdownListObjets = [];

        for(var i in rep.objets){
          this.dropdownListObjets.push({ item_id: i, item_text: rep.objets[i] });
        }
      }
    }, (err: any) => {
      console.log('erreur');
    });
  }

  postsearch() {
    const formData = new FormData();
    if (typeof(this.file[0]) !== 'undefined'){
      formData.append('file', this.file[0].file, this.file[0].file.name);
    }

    let list_scenes = "";
    let list_objets = "";

    this.selectedItemsScenes.forEach(scene => {
      list_scenes += ""+scene['item_id']+"_";
    });

    this.selectedItemsObjets.forEach(objet => {
      list_objets += ""+objet['item_id']+"_";
    });

    formData.append('scenes', list_scenes);
    formData.append('objets', list_objets);

    this.apiServiceService.getSearch(formData);
  }

  chercher_text(): void {
    const formData = new FormData();
    formData.append('search', this.value_search);
    this.apiServiceService.getSearchText(formData);
  }

}

/*
setTimeout(() => {
  sequence.subscribe({
    next(num) { console.log('2nd subscribe: ' + num); },
    complete() { console.log('2nd sequence finished.'); }
  });
}, 500);
*/
