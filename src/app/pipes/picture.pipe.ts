import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'picturePipe'})
export class PicturePipe implements PipeTransform {

  public defaultProfilePicture = "../../assets/img/default-avatar.png";

  transform(uuidPicture: string): string {
    if(uuidPicture){
      return "http://localhost:8083/pictures/static-picture/"+uuidPicture;
    }
    else{
        return this.defaultProfilePicture;
    }
  }
}