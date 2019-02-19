import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'urlDecodePipe'})
export class UrlDecodePipe implements PipeTransform {

  transform(text: string): string {
    let result = "";
    if(text){
      result = decodeURI(text);
    }
    return result;
  }
}