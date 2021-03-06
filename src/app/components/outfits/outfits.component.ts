import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { Clothe } from 'app/models/clothing/clothe';
import { UserService } from 'app/providers/user/user.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { HttpParams } from '@angular/common/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { DatePopup } from './popup/datePopup.component';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { PICTURES_PATH } from "../../globals";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'outfits-cmp',
    templateUrl: 'outfits.component.html'
})

export class OutfitsComponent implements OnInit{
    public clothes: Clothe[] = [];
    public searchCriteriaResult:SearchCriteriaResult = new SearchCriteriaResult();
    public lastSearchCriteriaResult:SearchCriteriaResult;
    public canFetch:boolean = true;
    public slideImages: any[];
    myConfig = {
        masonry: true
    };


    constructor(private clothingService: ClothingService,
                private dialogService:DialogService,
                private notificationsService: NotificationsService,
                private userService: UserService,
                public lightbox: CrystalLightbox){
        clothingService.setToken(userService.getToken());   
    }

    ngOnInit(){
        this.getOutfit();
    }

    getOutfit(){
        this.canFetch = false;
        let uuids=null;
        if(this.clothes.length>0 && JSON.stringify(this.lastSearchCriteriaResult) === JSON.stringify(this.searchCriteriaResult)){
            uuids = this.clothes.map((x) => {return x.uuid});
        }

        let params = new HttpParams();
        params = params.append("uuid", uuids);
        params = params.append("type", null); 
        this.clothingService.getOutfit(this.searchCriteriaResult, params).subscribe(
            (data:any) => {
                if(data.length<this.clothes.length 
                    && JSON.stringify(this.lastSearchCriteriaResult) === JSON.stringify(this.searchCriteriaResult)){

                    if(data.length>0){
                        for(let i = 0; i < this.clothes.length; i++){
                            if(data.filter(x => x.type==this.clothes[i].type)[0]){
                                this.clothes[i] = data.filter(x => x.type==this.clothes[i].type)[0];
                            }
                        }
                    }
                    this.initSlideImages();
                }else{
                    this.clothes = data;
                    this.initSlideImages();
                }
                this.lastSearchCriteriaResult = Object.assign({}, this.searchCriteriaResult);
                this.canFetch = true;
            }, (error: any) => {
                this.canFetch = true;
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la combinaci??n", this.notificationsService.DANGER);
            }
        );
    }

    getOtherOutfitClothe(uuid:string, type:string){
        let params = new HttpParams();
        params = params.append("uuid", uuid);
        params = params.append("type", type);      
        this.clothingService.getOutfit(this.searchCriteriaResult, params).subscribe(
            (data:any) => {
                if(data.length>0){
                    for(let i = 0; i < this.clothes.length; i++){
                        if(this.clothes[i].uuid == uuid){
                            this.clothes[i] = data[0];
                            break;
                        }
                    }
                    this.initSlideImages();
                }else{
                    this.notificationsService.showNotification("Esta es la ??nica prenda registrada del tipo "+type, this.notificationsService.WARNING); 
                }
                
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la combinaci??n", this.notificationsService.DANGER);
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

    addClotheToCalendar(uuidClothe:string, idClothe: number){
        let ids:any[] = [];
        ids[0] = {"uuid": uuidClothe, "id": idClothe};
        this.openDialog(ids);
    }

    addOutfitToCalendar(){
        let ids:any[] = this.clothes.map((x) => {return {"uuid": x.uuid, "id": x.id}});
        this.openDialog(ids);
    }

    openDialog(ids:any[]){
        let disposable = this.dialogService.addDialog(DatePopup, {
            title: "Escoja una fecha para agregar la prenda al calendario", 
            ids: ids,
            message: ""
        })
        .subscribe((result:any)=>{});
	}
}
