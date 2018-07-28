import { Component, OnInit } from '@angular/core';
import ntc from 'ntcjs';
import {Colores} from './colores';

declare var $:any;

@Component({
  selector: 'app-crearPrendas',
  templateUrl: './crearPrendas.component.html'
})

export class CrearPrendasComponent implements OnInit{
  regularItems = ['Pizza', 'Pasta', 'Parmesan'];
  filledItems = ['Pizza', 'Pasta', 'Parmesan'];
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  state_plain: boolean = true;
  state_with_icons: boolean = true;
  color:any = {hexString:""};
  clothe:any = {"state":1}



  ngOnInit() {
      //  Activate the tooltips
      $('[rel="tooltip"]').tooltip();

      //  Init Bootstrap Select Picker
      if($(".selectpicker").length != 0){
          $(".selectpicker").selectpicker({
              iconBase: "fa",
              tickIcon: "fa-check"
          });
      }

       $('.datepicker').datetimepicker({
          format: 'MM/DD/YYYY',    //use this format if you want the 12hours timpiecker with AM/PM toggle
          icons: {
              time: "fa fa-clock-o",
              date: "fa fa-calendar",
              up: "fa fa-chevron-up",
              down: "fa fa-chevron-down",
              previous: 'fa fa-chevron-left',
              next: 'fa fa-chevron-right',
              today: 'fa fa-screenshot',
              clear: 'fa fa-trash',
              close: 'fa fa-remove'
          }
       });

   }

   getApproximateColor(){
    const n_match = ntc.name(this.color.hexString);
    var n_rgb = n_match[0]; // RGB value of closest match
    var n_name = n_match[1]; // Text string: Color name
    var n_exactmatch = n_match[2]; // True if exact color match

    return Colores[n_rgb]; // [ '#6495ED', 'Cornflower Blue', false ]
   }
}

