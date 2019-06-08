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

  private data: any;
  mouseOver:boolean;
  imageChanged: File;
  croppedImage: string = '';
  images:PictureFile[] = [];
  cropperReady = false;
  imgIsTaller = false;
  @Input() maxImages:number;

  @ViewChild('fileTag')
  fileTag: ElementRef;

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
    if(cont<fileList.length && this.images.length<this.maxImages){
        this.imageChanged = fileList[cont];
        var reader = new FileReader();
        reader.readAsDataURL(this.imageChanged); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          if(this.isImage(reader.result.toString())){
              let file = new PictureFile();
              file.filename = this.imageChanged.name;
              file.filetype = this.imageChanged.type;
              file.value = reader.result.toString();
              file.size = this.imageChanged.size;

              this.images.push(file);


              cont++;
              this.getBase64(fileList, cont);
          }
        }
    }else{
      this.fileTag.nativeElement.value = "";
      
      
      this.propagateChange(this.images);

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

  onLoad(imgItem){
    let width = imgItem.offsetWidth;
    let height = imgItem.offsetHeight;
    if(width>height){
      this.imgIsTaller = false;
    }
    this.imgIsTaller = true;
  }

  cancelImage(event, index:number){
    this.prevent( event );
    this.images.splice(index, 1);
  }

  reset(){
    this.imageChanged = null;
    this.mouseOver = false;
    this.propagateChange(this.images);
    this.croppedImage = '';
  }

}
