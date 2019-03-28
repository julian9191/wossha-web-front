import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
  image:string;
  aspectRatio: string;
  resizeToWidth: number;
  roundCropper: boolean;
}
@Component({  
    selector: 'confirm',
    templateUrl: './popup.component.html',
    styleUrls: [ './popup.component.css' ]
})
export class Popup extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  image: any;
  aspectRatio: string;
  resizeToWidth: number;
  roundCropper:boolean;
  

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit(){
    //alert(this.aspectRatio+"");
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = this.croppedImage;
    this.close();
  }


  croppedImage: any = '';
  cropperReady = false;

  imageCroppedBase64(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }

}