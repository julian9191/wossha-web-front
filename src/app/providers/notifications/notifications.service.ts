import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';

declare var $:any;

@Injectable()
export class NotificationsService {
  
  public readonly INFO = "info";
  public readonly SUCCESS = "success";
  public readonly WARNING = "warning";
  public readonly DANGER = "danger";

  showNotification(text:string, type:string){
    var from = "top";
    var align = "center";

    var icons = [];
    icons[this.INFO] = "pe-7s-info";
    icons[this.SUCCESS] = "pe-7s-check";
    icons[this.WARNING] = "pe-7s-attention";
    icons[this.DANGER] = "pe-7s-close";
    
    $.notify({
        icon: icons[type],
        message: "<b>"+text

      },{
          type: type,
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
  
  showConfirmationAlert(title:string, text:string, type:string):Promise<boolean>{

    return swal({
        title: title,
        text: text,
        icon: "warning",
        buttons: {
            cancel: {
              text: "No",
              value: false,
              visible: true,
              className: "btn btn-default btn-fill",
              closeModal: true,
            },
            confirm: {
              text: "Si",
              value: true,
              visible: true,
              className: "btn btn-warning btn-fill",
              closeModal: true
            }
          },
        dangerMode: true,
    }).then((value) => {
        return value;
      });
}}
