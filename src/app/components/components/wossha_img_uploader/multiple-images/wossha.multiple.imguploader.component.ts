import { Component, forwardRef, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PictureFile } from '../../../../models/global/pictureFile';



import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'wossha-multiple-img-uploader',
  templateUrl: './wossha.multiple.imguploader.component.html',
  styleUrls: [ './wossha.multiple.imguploader.component.css' ],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => wosshaMultipleImgUploaderComponent),
    multi: true,
  }] 
})
export class wosshaMultipleImgUploaderComponent implements ControlValueAccessor, OnInit{
  url:string;
  private data: any;
  file:PictureFile;
  mouseOver:boolean;
  imageChanged: File;
  croppedImage: string = '';
  images:string[] = [];
  cropperReady = false;

  @ViewChild('fileTag')
  fileTag: ElementRef;

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
    let cont = 0;

    if(fileList.length>0){
      this.getBase64(fileList, cont);
    }
  }

  getBase64(fileList: FileList, cont:number){
    if(cont<fileList.length){
        this.imageChanged = fileList[cont];
        var reader = new FileReader();
        reader.readAsDataURL(this.imageChanged); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          if(this.isImage(reader.result.toString())){
              this.images.push(reader.result.toString());
              cont++;
              this.getBase64(fileList, cont);
          }
        }
    }else{
      this.fileTag.nativeElement.value = "";
    }
  }

  private isImage( type: string ): boolean {
    return ( type === '' || type === undefined ) ? false : type.startsWith('data:image');
  }


  onSelectFile(event) {
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

  imageLoadFailed () {
    console.log('Load failed');
  }

  imgIsTaller(imgItem){
    let width = imgItem.offsetWidth;
    let height = imgItem.offsetHeight;
    if(width>height){
      return false;
    }
    return true;
  }

  cancelImage(event, index:number){
    this.prevent( event );
    this.images.splice(index, 1);
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
