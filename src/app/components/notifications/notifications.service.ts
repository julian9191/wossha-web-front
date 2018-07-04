import { Injectable } from '@angular/core';

declare var $:any;

@Injectable()
export class NotificationsService {
  
  public readonly INFO = "info";
  public readonly SUCCESS = "success";
  public readonly WARNING = "warning";
  public readonly DANGER = "danger";

  showNotification(text, type){
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
  

}
