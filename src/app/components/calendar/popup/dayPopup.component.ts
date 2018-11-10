import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

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

  closeDialog(){
    this.result = null;
    this.close();
  }

  getImage(uuid:string):string{
    if(uuid){
      return "http://localhost:8083/pictures/static-picture/"+uuid;
    }else{
      return "../assets/img/blog-1.jpg";
    }
  }

  initSlideImages(images: any) {
      this.result = images;
      this.ngOnDestroy();
  }

  openSlideshow(index:any){
    this.result = index;
    this.ngOnDestroy();
  }
  
}