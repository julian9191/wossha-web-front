import { Component, OnInit } from '@angular/core';
import {ClothingService} from "../../../providers/clothing/clothing.service";
import { ClothingType } from '../../../models/clothing/clothingType';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { ClothingCategory } from '../../../models/clothing/clothingCategory';
import { Clothe } from '../../../models/clothing/clothe';
import { CreateClotheCommand } from '../../../models/clothing/commands/createClotheCommand';
import { User } from '../../../models/user/user';

declare var $:any;

@Component({
  selector: 'app-crearPrendas',
  templateUrl: './crearPrendas.component.html'
})

export class CrearPrendasComponent implements OnInit{
  simpleSlider = 5;
  state_default: boolean = true;
  state_plain: boolean = true;
  state_with_icons: boolean = true;
  public maxDate:Date;

  color:any = {hexString:""};
  clothe:any = {"state":1}
  selectedColorName:string = "";
  searchResult:any;
  register:Clothe;

  clothingTypes:ClothingType[];
  clothingCategories:ClothingCategory[];
  createClotheCommand:CreateClotheCommand;
  user:User;

  constructor(private clothingService: ClothingService,
    private userService: UserService,
    private notificationsService: NotificationsService){
        clothingService.setToken(userService.getToken());
    }

  ngOnInit() {
      this.maxDate = new Date();
      this.user = this.userService.getLoggedUserSessionInfo().user;
      this.createClotheCommand = new CreateClotheCommand();
      this.createClotheCommand.username = this.user.username;

      this.getClothingTypes();
      this.getClothingCategories();

      this.refreshClothe();
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

    save(model: Clothe, isValid: boolean) {
        if(isValid){
            let color:any=model.colorCode;
            model.baseColor=color.baseColorId;
            model.colorCode=color.realColorHexa;
            model.username = this.user.username;
            this.createClotheCommand.clothe = model;

            this.clothingService.executeCommand(this.createClotheCommand).subscribe( 
                (messaje) => {
                    this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                    this.refreshClothe();
                }, (error: any) => {
                    this.notificationsService.showNotification(error.error.msj, this.notificationsService.WARNING);
                }
            );
        }
    }

    refreshClothe(){
        this.register = {
            id: null,
            uuid:'',
            username:'',
            name:'',
            description:'',
            type:'',
            category:'',
            purchaseDate:null,
            howLike:5,
            brand:'',
            state:null,
            colorCode:'',
            baseColor:null
        }
    }
}

