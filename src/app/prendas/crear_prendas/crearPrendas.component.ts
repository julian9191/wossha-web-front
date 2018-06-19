import { Component, OnInit } from '@angular/core';

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
  color = "";

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

   onClickMe(){
       console.log(this.color);
   }
}

