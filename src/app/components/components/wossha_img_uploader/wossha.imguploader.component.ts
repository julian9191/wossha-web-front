import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class wosshaImgUploaderComponent implements ControlValueAccessor{
  url:string = '../assets/img/shirt.png';
  fileName:string = 'Seleccione una foto';
  private data: any;

  // this is the initial value set to the component
  public writeValue(obj: any) {
        console.log(obj);
        if (obj) {
            this.data = obj;
        }
  }

  // not used, used for touch input
  public registerOnTouched() { }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    console.log(fn);
    this.propagateChange = fn;
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };

  openInputFile(file){
      file.click();
  }

  onSelectFile(event, file) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        if(file.value){
            let val:string[] = file.value.split("\\");
            if(val.length>0){
                this.fileName = val[val.length-1];
            }
        }
        this.url = event.target.result;

        this.propagateChange(file.value);
      }
    }
  }
}
