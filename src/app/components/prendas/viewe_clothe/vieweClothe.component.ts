import { Component, OnInit, ViewChild } from '@angular/core';
import {ClothingService} from "../../../providers/clothing/clothing.service";
import {UserService} from "../../../providers/user/user.service";;
import { Clothe } from '../../../models/clothing/clothe';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { PictureFile } from 'app/models/global/pictureFile';

declare var $:any;

@Component({
  selector: 'app-vieweClothe',
  templateUrl: './vieweClothe.component.html',
  styleUrls: [ './vieweClothe.component.css' ],
})

export class VieweClotheComponent implements OnInit{
  
    clothe:Clothe;

    constructor(private clothingService: ClothingService,
                private userService: UserService,
                private notificationsService: NotificationsService,
                private route: ActivatedRoute){
        clothingService.setToken(userService.getToken());
    }

    ngOnInit() {
        this.refreshClothe();
        this.getClothe(); 
    }

    getClothe(){
        let uuid:string = this.route.snapshot.paramMap.get("uuid");
        this.clothingService.getClotheByUuid(uuid).subscribe( 
            (data:any) => {
                this.clothe = data;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la prenda", this.notificationsService.DANGER);
            }
        );
    }

    getImage(uuid:string):string{
        if(uuid){
          return "http://localhost:8083/pictures/static-picture/"+uuid;
        }
        else{
          return "../assets/img/blog-1.jpg";
        }
    }

    refreshClothe(){
        this.clothe = {
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
            colorCode:{"baseColorId": "", "realColorHexa": ""},
            baseColor:null,
            picture: new PictureFile(),
            pictureValue: null
        }
    }
}

