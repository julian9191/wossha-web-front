import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Clothe } from 'app/models/clothing/clothe';
import { PictureFile } from 'app/models/global/pictureFile';

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

  public winHeight: number;
  public winWidth: number;

  constructor(dialogService: DialogService) {
    super(dialogService);
    this.winHeight = (window.innerHeight);
    this.winWidth = (window.innerWidth);
  }

  ngOnInit(){}

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
}