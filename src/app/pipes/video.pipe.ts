import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'videoPipe'})
export class VideoPipe implements PipeTransform {

  public baseUrl = "https://www.youtube.com/embed/";

  constructor(private sanitizer: DomSanitizer){}


  transform(url: string, arg1?:string) {
    if(arg1=="CODE"){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+url);
    }

    if(url.startsWith(this.baseUrl)){
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else if(url.startsWith("https://www.youtube.com/watch")){
      let videoId = url.split("=");
      if(videoId.length>0){
          videoId = videoId[1].split("&");
          return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+videoId[0]);
      }
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl("");
    }
  }
}