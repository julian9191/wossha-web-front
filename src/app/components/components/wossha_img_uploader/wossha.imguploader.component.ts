import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PictureFile } from '../../../models/global/pictureFile';

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
        this.propagateFile(file, reader);
      }
    }
  }

  private isImage( type: string ): boolean {
    return ( type === '' || type === undefined ) ? false : type.startsWith('image');
  }


  onSelectFile(event, file) {
    if (event.target.files && event.target.files[0]) {

      this.imageChangedEvent = event;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        if(file.value){
            let val:string[] = file.value.split("\\");
            if(val.length>0){
                this.fileName = val[val.length-1];
            }
            this.propagateFile(file, reader);
        }
        
      }
    }
  }

  openPopup(){
    
  }

  propagateFile(file, reader:FileReader){
    this.file.filename = file.name;
    this.file.filetype = file.type;
    this.file.size = file.size;
    this.file.value = reader.result.toString();

    this.url = this.file.value;
    this.propagateChange(this.file);
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

  reset(){
    this.url = '';
    this.fileName = '';
    this.file = new PictureFile();
    this.mouseOver = false;
    this.propagateChange(this.file);
  }













  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

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

}
