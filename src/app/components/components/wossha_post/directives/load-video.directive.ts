import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appLoadVideo]'
})
export class LoadVideoDirective implements OnInit{
  
  private el: any;

  constructor(el: ElementRef, public renderer: Renderer)
  { 
    this.el = el.nativeElement; 
    this.renderer = renderer;
  }

  ngOnInit(){
    this.display = "none";
  }

  @HostListener('load') 
  onLoand() { 
    this.displayIframe();
  }

  @HostBinding('style.display')
  display:string;

  private displayIframe(): void {

    let url = this.el.src;
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
          this.display = "inline";
        }
        else {
          this.display = "none";
        }
    }


    
  }

}
