import { Component, OnInit } from '@angular/core';
import { Clothe } from '../../../models/clothing/clothe';
import { ClothingService } from '../../../providers/clothing/clothing.service';
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { UserService } from '../../../providers/user/user.service';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '../../../models/global/pagination';

@Component({
  selector: 'app-listarPrendas',
  templateUrl: './listarPrendas.component.html'
})

export class ListarPrendasComponent implements OnInit{

  clothes: Clothe[] = [];
  orderedBy: string = "NAME";
  view: string = "cards";
  totalItems = 0;
	currentPage = 1;
	itemsPerPage = 5;

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
      }, (error: any) => {
        this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
      }
    );
  }

}
