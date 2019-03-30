import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizableImg]'
})
export class ResizableImgDirective implements OnInit{
  
  private el: any;
  private width100:string = "width100";
  private height100:string = "height100";

  constructor(el: ElementRef, public renderer: Renderer)
  { 
    this.el = el.nativeElement; 
    this.renderer = renderer;
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

  @HostBinding('class')
  elementClass = "";


  resizeWorks(){
    let width = this.el.offsetWidth;
    let height = this.el.offsetHeight;
    if(width>height){
      this.elementClass = this.height100;
    }else{
      this.elementClass = this.width100;
    }
}

}
