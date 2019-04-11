import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizableVideo]'
})
export class ResizableVideoDirective implements OnInit{
  
  private el: any;

  constructor(el: ElementRef, public renderer: Renderer)
  { 
    this.el = el.nativeElement; 
  }

  ngOnInit(){}

  @HostListener('window:resize', ['$event.target']) 
  onResize() { 
    this.resizeWorks();
  }

  @HostListener('load') 
  onLoand() { 
    this.resizeWorks();
  }

  @HostBinding('style.height.px')
  elHeight:number;


  resizeWorks(){
    let width = this.el.offsetWidth;
    this.elHeight = width*0.5625;
}

}
