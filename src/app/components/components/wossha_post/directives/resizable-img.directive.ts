import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appResizableImg]'
})
export class ResizableImgDirective implements OnInit{
  
  private el: any;
  private width100:string = "width100";
  private height100:string = "height100";

  constructor(el: ElementRef, public renderer: Renderer, private cdRef:ChangeDetectorRef)
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
    console.log(111);
    let width = this.el.offsetWidth;
    let height = this.el.offsetHeight;
    if(width>height){
      console.log(222);
      this.elementClass = this.height100;
    }else{
      console.log(333);
      this.elementClass = this.width100;
    }
    console.log(444);
    this.cdRef.detectChanges();
}

}
