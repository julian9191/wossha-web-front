import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'two-modal2',
  templateUrl: './two-modal.component.html',
  styleUrls: ['./two-modal.component.css']
})
export class TwoModalComponent implements OnInit {

  @ViewChild('popuptwo') popuptwo:NgxSmartModalComponent;
  data:any;
  reactions:any[] = [];
  reactionType:string = "";

  constructor(public ngxSmartModalService: NgxSmartModalService,
    private _location: Location) { }

  ngOnInit() {}

  close(){
    this.popuptwo.close();
  }

  onOpen(event){
    this.data = this.popuptwo.getData();
    this.reactions = this.data.reactions;
    this.reactionType = this.data.reactionType;
    let _that = this;
    setTimeout(function(){ 
      $('#myTab a[href="#icon-'+_that.reactionType.toLowerCase()+'"]').tab('show');
    }, 100);
  }

}