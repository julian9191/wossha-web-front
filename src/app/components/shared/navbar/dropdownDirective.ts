import {Directive, HostBinding, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

    @Output() notifDropDownOpened = new EventEmitter<boolean>();
    opened:boolean = false;

    @HostListener('click') open(){
        this.opened = !this.opened;
        if(this.opened){
            this.notifDropDownOpened.emit(this.opened);
        }
    }

}