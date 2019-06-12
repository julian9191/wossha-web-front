import { Component, OnInit, ViewChild } from '@angular/core';
import { Clothe } from '../../../models/clothing/clothe';
import { ClothingService } from '../../../providers/clothing/clothing.service';
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { UserService } from '../../../providers/user/user.service';
import { HttpParams } from '@angular/common/http';
import { RemoveClotheCommand } from 'app/models/clothing/commands/removeClotheCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { PICTURES_PATH } from "../../../globals";

import { style, animate, transition, trigger, query as q } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

@Component({
  selector: 'app-listClothing',
  templateUrl: './listClothing.component.html',
  animations: [
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),      
    ])
  ],
  styleUrls: [ './listClothing.component.css' ],
})

export class ListClothingComponent implements OnInit{

  public clothes: Clothe[] = [];
  public orderedBy: string = "NAME";
  public view: string = "cards";
  public totalItems = 0;
	public currentPage = 1;
  public itemsPerPage = 5;
  public user:LoginUser;
  public removeClotheCommand:RemoveClotheCommand;
  public searchCriteriaResult:SearchCriteriaResult = new SearchCriteriaResult();
  public canFetch:boolean = true;
  public slideImages: any[];
  public loading:boolean = true;

  myConfig = {
    masonry: true
  };

  constructor(private clothingService: ClothingService, 
    private notificationsService: NotificationsService,
    private userService: UserService,
    public lightbox: CrystalLightbox){
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

  getClothes(append:boolean){
    let params = new HttpParams();
    params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
    params = params.append("limit", this.itemsPerPage+"");
    this.loading = true;
    this.clothingService.getClothes(this.searchCriteriaResult, this.orderedBy, params).subscribe(
      (data:any) => {
        this.loading =false;
        if(append){
          this.clothes = this.clothes.concat(data.result);
        }else{
          this.clothes = data.result;
        }
        this.totalItems = data.pagination.size;
        this.currentPage++;
        this.initSlideImages();
      }, (error: any) => {
        this.loading =false;
        this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
      }
    );
  }

  getImage(uuid:string):string{
    if(uuid){
      return PICTURES_PATH+uuid;
    }else{
      return "../assets/img/blog-1.jpg";
    }
  }

  initSlideImages(){  
    this.slideImages = [];
    for (let clothe of this.clothes) {
      let item:any = {
          preview: this.getImage(clothe.picture),
          full: this.getImage(clothe.picture),
          width: 800,
          height: 600,
          description: ""
      }
      this.slideImages.push(item);
    }
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
