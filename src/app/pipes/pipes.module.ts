import { NgModule } from '@angular/core';

//pipes
import { FromDatePipe } from "./fromDate.pipe";
import { PicturePipe } from "./picture.pipe";

@NgModule({
    imports: [],
    exports: [
        FromDatePipe,
        PicturePipe
    ],
    entryComponents: [],
    declarations: [
        FromDatePipe,
        PicturePipe
    ],
    providers: []
})

export class PipesModule {}
