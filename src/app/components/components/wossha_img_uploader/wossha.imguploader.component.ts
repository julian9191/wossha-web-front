import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PictureFile } from '../../../models/global/pictureFile';


import { Popup } from './popup.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'wossha-img-uploader',
  templateUrl: './wossha.imguploader.component.html',
  styleUrls: [ './wossha.imguploader.component.css' ],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => wosshaImgUploaderComponent),
    multi: true,
  }] 
})
export class wosshaImgUploaderComponent implements ControlValueAccessor, OnInit{
  url:string;
  fileName:string;
  private data: any;
  file:PictureFile;
  mouseOver:boolean;
  imageChangedEvent: any = '';
  croppedImage: string = '';
  cropperReady = false;

  constructor(private dialogService:DialogService) {}

  ngOnInit(){
    this.reset();
  }

  // this is the initial value set to the component
  public writeValue(obj: any) {
        if (obj) {
            this.data = obj;
        }
  }

  // not used, used for touch input
  public registerOnTouched() { }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };

  openInputFile(file){
      file.click();
  }

  private prevent( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles( fileList: FileList ) {
    if(fileList[0]){
      let file = fileList[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.fileName = file.name;
        //this.propagateFile(file, reader);
      }
    }
  }

  private isImage( type: string ): boolean {
    return ( type === '' || type === undefined ) ? false : type.startsWith('image');
  }


  onSelectFile(event, file) {
    if (event.target.files && event.target.files[0]) {
      this.imageChangedEvent = event;
      this.showConfirm();
    }
  }

  propagateFile(file){
    this.file.filename = file.name;
    this.file.filetype = file.type;
    this.file.value = this.croppedImage;
    this.file.size = this.getNewImageSize(this.file.value);

    this.url = this.file.value;
    this.propagateChange(this.file);
  }

  getNewImageSize(base64String: string):number{
    let stringLength = base64String.length - 'data:image/jpeg;base64,'.length;

    let sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
    return sizeInBytes/1000;
  }

  onDragover(event){
    this.mouseOver = true;
    this.prevent( event );
  }

  onDragleave(event){
    this.mouseOver = false;
  }

  onDrop(event){
    const transfer = this.getTransfer( event );
    if ( !transfer ) {
      return;
    }
    this.extractFiles( transfer.files );

    this.prevent( event );
    this.mouseOver = false;
  }

  cancelImage(event){
    this.prevent( event );
    this.reset();
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(Popup, {
      title:'Por favor seleccione el area de la imagen', 
      image: this.imageChangedEvent
    })
    .subscribe((result:any)=>{
        if(result !== undefined){
          this.croppedImage = result;
          if(this.imageChangedEvent.target.files[0]){
              this.fileName = this.imageChangedEvent.target.files[0].name;
              this.propagateFile(this.imageChangedEvent.target.files[0]);
          }

        }else if(this.croppedImage == ""){
          this.reset();
        }
        
    });
  }


  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }

  reset(){
    this.url = '';
    this.fileName = '';
    this.file = new PictureFile();
    this.mouseOver = false;
    this.propagateChange(this.file);
    this.croppedImage = '';
  }

}
