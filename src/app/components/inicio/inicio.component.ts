import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'inicio-cmp',
    templateUrl: 'inicio.component.html'
})

export class InicioComponent implements OnInit{
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
