import { Component, OnInit, ViewChild } from '@angular/core';
import { Clothe } from '../../../models/clothing/clothe';
import { ClothingService } from '../../../providers/clothing/clothing.service';
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { UserService } from '../../../providers/user/user.service';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '../../../models/global/pagination';
import { PicturesService } from '../../../providers/pictures/pictures.service';
import { PhotoSwipeComponent } from 'app/components/components/photo-swipe/photo-swipe.component';
import { PhotoSwipeImage } from 'app/models/global/photoSwipeImage';
import { RemoveClotheCommand } from 'app/models/clothing/commands/removeClotheCommand';
import { LoginUser } from 'app/models/user/login/loginUser';

@Component({
  selector: 'app-listClothing',
  templateUrl: './listClothing.component.html',
  styleUrls: [ './listClothing.component.css' ],
})

export class ListClothingComponent implements OnInit{

  public clothes: Clothe[] = [];
  public orderedBy: string = "NAME";
  public view: string = "cards";
  public totalItems = 0;
	public currentPage = 1;
  public itemsPerPage = 5;
  @ViewChild('photoSwipe') 
  public photoSwipe: PhotoSwipeComponent;
  public slideImages: PhotoSwipeImage[];
  user:LoginUser;
  removeClotheCommand:RemoveClotheCommand;

  constructor(private clothingService: ClothingService, 
    private notificationsService: NotificationsService,
    private userService: UserService){
    clothingService.setToken(userService.getToken());
  }

  ngOnInit(){
    this.user = this.userService.getLoggedUserSessionInfo().user;
    this.removeClotheCommand = new RemoveClotheCommand();
    this.removeClotheCommand.username = this.user.username;
    this.getClothes(false);
  }

  getMoreClothes(append:boolean){
    this.currentPage = 1;
    this.getClothes(append);
  }

  getImage(uuid:string):string{
    if(uuid){
      return "http://localhost:8083/pictures/static-picture/"+uuid;
    }else{
      return "../assets/img/blog-1.jpg";
    }
  }

  getClothes(append:boolean){
    let params = new HttpParams();
    params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
    params = params.append("limit", this.itemsPerPage+"");
    this.clothingService.getClothes(this.orderedBy, params).subscribe(
      (data:any) => {
        if(append){
          this.clothes = this.clothes.concat(data.result);
        }else{
          this.clothes = data.result;
        }
        this.totalItems = data.pagination.size;
        this.currentPage++;
        this.initSlideImages();
      }, (error: any) => {
        this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
      }
    );
  }

  initSlideImages(){  
    this.slideImages = [];
    for (let clothe of this.clothes) {
      let item:PhotoSwipeImage = {
          src: this.getImage(clothe.picture),
          w: 800,
          h: 600
      }
      this.slideImages.push(item);
    }
  }

  openSlideshow(index:number){
    this.photoSwipe.openGallery(this.slideImages, index);
  }

  removeClothe(uuid:string){

    let nthis = this;
    this.notificationsService.showConfirmationAlert("¿Está seguro?", "¿Está seguro de eliminar la prenda?", this.notificationsService.WARNING).then(function (response) {
        if(response){
          nthis.removeClotheCommand.uuid = uuid;

          nthis.clothingService.executeCommand(nthis.removeClotheCommand).subscribe( 
              (messaje) => {
                nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
                nthis.removeLocalClothe(uuid);
              }, (error: any) => {
                nthis.notificationsService.showNotification(error.error.msj, nthis.notificationsService.DANGER);
              }
          );
        }
  });    
}

removeLocalClothe(uuid:string){
  this.clothes = this.clothes.filter(c => c.uuid!=uuid);
  this.totalItems--;
}

}
