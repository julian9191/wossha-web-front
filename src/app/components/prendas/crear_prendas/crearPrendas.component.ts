import { Component, OnInit } from '@angular/core';
import {ClothingService} from "../../../providers/clothing/clothing.service";
import { ClothingType } from '../../../models/clothing/clothingType';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { ClothingCategory } from '../../../models/clothing/clothingCategory';

declare var $:any;

@Component({
  selector: 'app-crearPrendas',
  templateUrl: './crearPrendas.component.html'
})

export class CrearPrendasComponent implements OnInit{
  regularItems = ['Pizza', 'Pasta', 'Parmesan'];
  filledItems = ['Pizza', 'Pasta', 'Parmesan'];
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  state_plain: boolean = true;
  state_with_icons: boolean = true;
  color:any = {hexString:""};
  clothe:any = {"state":1}
  selectedColorName:string = "";
  searchResult:any;

  clothingTypes:ClothingType[];
  clothingCategories:ClothingCategory[];

  constructor(private clothingService: ClothingService,
    private userService: UserService,
    private notificationsService: NotificationsService){
        clothingService.setToken(userService.getToken());
    }

  ngOnInit() {
      this.getClothingTypes();
      this.getClothingCategories();

   }

   getClothingTypes(){
        this.clothingService.getAllClothingTypes().subscribe( 
            (data:any) => {
                this.clothingTypes = data;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los tipos de prenda", this.notificationsService.WARNING);
            }
        );
   }

   getClothingCategories(){
    this.clothingService.getAllClothingCategories().subscribe( 
        (data:any) => {
            this.clothingCategories = data;
        }, (error: any) => {
            this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las categorias de prenda", this.notificationsService.WARNING);
        }
    );
}
}

