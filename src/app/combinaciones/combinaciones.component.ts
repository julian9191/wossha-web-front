import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'combinaciones-cmp',
    templateUrl: 'combinaciones.component.html'
})

export class CombinacionesComponent implements OnInit{
	filledItems = ['Boxer', 'Camiseta', 'Medias'];
    ngOnInit(){

		//  Init Bootstrap Select Picker
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker({
                iconBase: "fa",
                tickIcon: "fa-check"
            });
        }
        
    }
}
