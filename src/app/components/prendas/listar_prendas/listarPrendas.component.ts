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

@Component({
  selector: 'app-listarPrendas',
  templateUrl: './listarPrendas.component.html'
})

export class ListarPrendasComponent implements OnInit{

  public clothes: Clothe[] = [];
  public orderedBy: string = "NAME";
  public view: string = "cards";
  public totalItems = 0;
	public currentPage = 1;
  public itemsPerPage = 5;
  @ViewChild('photoSwipe') 
  public photoSwipe: PhotoSwipeComponent;
  public slideImages: PhotoSwipeImage[];

  constructor(private clothingService: ClothingService, 
    private notificationsService: NotificationsService,
    private userService: UserService){
    clothingService.setToken(userService.getToken());
  }

  ngOnInit(){
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

}
