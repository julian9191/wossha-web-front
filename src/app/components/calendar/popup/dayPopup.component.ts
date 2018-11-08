import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Clothe } from 'app/models/clothing/clothe';
import { PictureFile } from 'app/models/global/pictureFile';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { UserService } from 'app/providers/user/user.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { SearchCriteriaParams } from 'app/models/clothing/searchCriteriaParams';

declare var $:any;

export interface ConfirmModel {
  title:string;
  message:string;
  date:Date;
}
@Component({  
    selector: 'confirm',
    templateUrl: './dayPopup.component.html',
    styleUrls: [ './dayPopup.component.css' ]
})
export class DayPopup extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  date: Date;
  public clothes: Clothe[] = [];
  public winHeight: number;
  public winWidth: number;
  public searchCriteriaParams:SearchCriteriaParams = new SearchCriteriaParams();
  selectedItems = [];
  settings = {};

  constructor(dialogService: DialogService,
              private clothingService: ClothingService,
              private notificationsService: NotificationsService,
              private userService: UserService ) {
    super(dialogService);
    clothingService.setToken(userService.getToken());
    this.winHeight = (window.innerHeight);
    this.winWidth = (window.innerWidth);
  }

  ngOnInit(){
    this.getSearchCriteriaParams();
    this.clothes.push(this.createClothe());
    this.clothes.push(this.createClothe());
    this.clothes.push(this.createClothe());
    this.clothes.push(this.createClothe());


    this.selectedItems = [];
    this.settings = {
        text: "Tipos de prenda",
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'reestablecer',
        classes: "btn-warning btn-block"
    };        

  }

  getSearchCriteriaParams(){
    this.clothingService.getSearchCriteriaParams().subscribe(
      (data:any) => {
        this.searchCriteriaParams = data;

        console.log(this.searchCriteriaParams);

        //  Init Bootstrap Select Picker
        if($(".selectpicker").length != 0){
          $(".selectpicker").selectpicker({
              iconBase: "fa",
              tickIcon: "fa-check"
          });
        }

      }, (error: any) => {
        this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
      }
    );
  }

  confirm() {

    this.close();
  }

  getImage(uuid:string):string{
      if(uuid){
        return "http://localhost:8083/pictures/static-picture/"+uuid;
      }else{
        return "../assets/img/blog-1.jpg";
      }
    }


  createClothe(){
    return {
        id: null,
        uuid:'',
        username:'',
        name:'',
        description:'',
        type:'',
        category:'',
        purchaseDate:null,
        howLike:5,
        brand:'',
        state:null,
        colorCode:{"baseColorId": "", "realColorHexa": ""},
        baseColor:null,
        picture: new PictureFile(),
        pictureValue: null
    }
}










onItemSelect(item: any) {
  console.log(item);
  console.log(this.selectedItems);
}
OnItemDeSelect(item: any) {
  console.log(item);
  console.log(this.selectedItems);
}
onSelectAll(items: any) {
  console.log(items);
}
onDeSelectAll(items: any) {
  console.log(items);
}

}