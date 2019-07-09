import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'three-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {

  @ViewChild('popupthree') popupthree:NgxSmartModalComponent;
  data:any;


  constructor(public ngxSmartModalService: NgxSmartModalService,
    private _location: Location) { }
  ngOnInit() {}

  close(){
    this.popupthree.close();
  }

  onOpen(event){
    this.data = this.popupthree.getData();
   
    let _that = this;
    setTimeout(function(){ 
      //$('#myTab a[href="#icon-'+_that.reactionType.toLowerCase()+'"]').tab('show');
    }, 100);
  }
}