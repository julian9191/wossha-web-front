import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PictureFile } from '../../../../models/global/pictureFile';


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
  private data: any;
  file:PictureFile;
  mouseOver:boolean;
  imageChanged: File;
  croppedImage: string = '';
  cropperReady = false;

  @Input()
  aspectRatio: string;
  @Input()
  resizeToWidth: number;
  @Input()
  roundCropper: boolean;

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
      this.imageChanged = fileList[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.imageChanged); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        if(this.isImage(reader.result.toString())){
            this.showConfirm(reader.result.toString());
        }
      }
    }
  }

  private isImage( type: string ): boolean {
    return ( type === '' || type === undefined ) ? false : type.startsWith('data:image');
  }


  onSelectFile(event, file) {
    if (event.target.files) {
      this.extractFiles(event.target.files);
    }
  }

  propagateFile(){
    this.file.filename = this.imageChanged.name;
    this.file.filetype = this.imageChanged.type;
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

  showConfirm(file: string) {
    let disposable = this.dialogService.addDialog(Popup, {
      title:'Por favor seleccione el area de la imagen', 
      image: file,
      message: "",
      aspectRatio: this.aspectRatio,
      resizeToWidth: this.resizeToWidth,
      roundCropper: this.roundCropper
    })
    .subscribe((result:any)=>{
        if(result !== undefined){
          this.croppedImage = result;
          this.propagateFile();


        }else if(this.croppedImage == ""){
          this.reset();
        }
        
    });
  }


  fileChangeEvent(event: any): void {
    this.imageChanged = event.target.files[0];
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
    this.file = new PictureFile();
    this.imageChanged = null;
    this.mouseOver = false;
    this.propagateChange(this.file);
    this.croppedImage = '';
  }

}
