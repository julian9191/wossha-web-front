import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizableDiv]'
})
export class ResizableDivDirective implements OnInit{
  
  private el: HTMLElement;

  constructor(el: ElementRef, public renderer: Renderer)
  { 
    this.el = el.nativeElement; 
    this.renderer = renderer;
  }

  ngOnInit(){
    this.resizeWorks();
  }

  @HostListener('window:resize', ['$event.target']) 
  onResize() { 
    this.resizeWorks();
  }

  @HostBinding('style.height.px')
  elHeight:number;

  private resizeWorks(): void {
    this.elHeight = this.el.offsetWidth;
  }

}
