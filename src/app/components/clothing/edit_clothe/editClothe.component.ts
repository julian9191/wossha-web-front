import { Component, OnInit, ViewChild } from '@angular/core';
import {ClothingService} from "../../../providers/clothing/clothing.service";
import { ClothingType } from '../../../models/clothing/clothingType';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { ClothingCategory } from '../../../models/clothing/clothingCategory';
import { Clothe } from '../../../models/clothing/clothe';
import { NgForm } from '@angular/forms';
import { PictureFile } from '../../../models/global/pictureFile';
import { LoginUser } from '../../../models/user/login/loginUser';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EditClotheCommand } from 'app/models/clothing/commands/editClotheCommand';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { PICTURES_PATH } from "../../../globals";

declare var $:any;

@Component({
  selector: 'app-editClothe',
  templateUrl: './editClothe.component.html'
})

export class EditClotheComponent implements OnInit{
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
  public loading:boolean = false;
  clothingTypes:ClothingType[];
  clothingCategories:ClothingCategory[];
  editClotheCommand:EditClotheCommand;
  user:LoginUser;
  name: string;
  clothePicture:string = null;
  public slideImages: any[];
  myConfig = {
    masonry: true
  };

  constructor(private clothingService: ClothingService,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private _location: Location,
    public lightbox: CrystalLightbox){
        clothingService.setToken(userService.getToken());
    }

  ngOnInit() {
      this.maxDate = new Date();
      this.user = this.userService.getLoggedUserSessionInfo().user;
      this.editClotheCommand = new EditClotheCommand();
      this.editClotheCommand.username = this.user.username;

      this.getClothingTypes();
      this.getClothingCategories();

      this.refreshClothe();
      this.getClothe(); 
   }

   getClothingTypes(){
        this.clothingService.getAllClothingTypes().subscribe( 
            (data:any) => {
                this.clothingTypes = data;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los tipos de prenda", this.notificationsService.DANGER);
            }
        );
   }

   getClothingCategories(){
        this.clothingService.getAllClothingCategories().subscribe( 
            (data:any) => {
                this.clothingCategories = data;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las categorias de prenda", this.notificationsService.DANGER);
            }
        );
    }

    getClothe(){
        let uuid:string = this.route.snapshot.paramMap.get("uuid");
        this.clothingService.getClotheByUuid(uuid).subscribe( 
            (data:any) => {
                this.register = data;
                this.register.state=this.register.state+"";
                this.clothePicture = (' ' + this.register.picture).slice(1);
                this.clothePicture = this.clothePicture == 'null' ? null : this.clothePicture; 
                this.register.colorCode = {"baseColorId": this.register.baseColor, "realColorHexa": this.register.colorCode},

                this.initSlideImages();
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la prenda", this.notificationsService.DANGER);
            }
        );
    }

    initSlideImages(){
        this.slideImages = [
            {
                preview: this.getImage(this.register.picture),
                full: this.getImage(this.register.picture),
                width: 800,
                height: 600,
                description: ""
            }
        ];
    }

    save(model: Clothe, isValid: boolean, f:NgForm, p:NgForm) {
        if(isValid){
            model.uuid = this.route.snapshot.paramMap.get("uuid");
            let color:any=model.colorCode;
            model.baseColor=color.baseColorId;
            model.colorCode=color.realColorHexa;
            model.username = this.user.username;
            if(!(model.picture instanceof PictureFile)){
                model.picture = null;
            }

            this.editClotheCommand.clothe = model;
            this.loading = true;
            this.clothingService.executeCommand(this.editClotheCommand).subscribe( 
                (messaje) => {
                    this.loading = false;
                    this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                    p.reset();
                    f.resetForm();
                    this.refreshClothe();
                    this.getClothe(); 
                }, (error: any) => {
                    this.loading = false;
                    this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
                }
            );
        }
    }

    goBack(){
        this._location.back();
    }

    getImage(uuid:string):string{
        try {
            if(uuid && !this.register.picture.value){
                return PICTURES_PATH+uuid;
            }
        }catch(err) {}

        if(this.register.picture){
            if(this.register.picture.value){
                return this.register.picture.value;
            }
        }
          
        return "../assets/img/blog-1.jpg";
        
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
            state:'',
            colorCode:{"baseColorId": "", "realColorHexa": ""},
            baseColor:null,
            picture: new PictureFile(),
            pictureValue: null
        }
    }
}

