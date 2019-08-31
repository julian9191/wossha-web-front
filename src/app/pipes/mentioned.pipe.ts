import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mentionedPipe'})
export class MentionedPipe implements PipeTransform {

  transform(text: string, mentionedUsers:string[]): string {
    if(text && mentionedUsers){
      for (const user of mentionedUsers) {
        text = text.split('@'+user).join('<a>@'+user+'</a>')
      }
      return text;
    }
    else{
        return text;
    }
  }
}