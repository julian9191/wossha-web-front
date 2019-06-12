import { Pipe, PipeTransform } from '@angular/core';
import { PICTURES_PATH } from "../globals";

@Pipe({name: 'picturePipe'})
export class PicturePipe implements PipeTransform {

  public defaultProfilePicture = "../../assets/img/default-avatar.png";

  transform(uuidPicture: string): string {
    if(uuidPicture){
      return PICTURES_PATH+uuidPicture;
    }
    else{
        return this.defaultProfilePicture;
    }
  }
}