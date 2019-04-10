import { NgModule } from '@angular/core';

//pipes
import { FromDatePipe } from "./fromDate.pipe";
import { PicturePipe } from "./picture.pipe";
import { VideoPipe } from "./video.pipe";


@NgModule({
    imports: [],
    exports: [
        FromDatePipe,
        PicturePipe,
        VideoPipe
    ],
    entryComponents: [],
    declarations: [
        FromDatePipe,
        PicturePipe,
        VideoPipe
    ],
    providers: []
})

export class PipesModule {}
