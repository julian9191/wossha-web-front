import { NgModule } from '@angular/core';

//pipes
import { FromDatePipe } from "./fromDate.pipe";
import { PicturePipe } from "./picture.pipe";
import { VideoPipe } from "./video.pipe";
import { MentionedPipe } from "./mentioned.pipe";


@NgModule({
    imports: [],
    exports: [
        FromDatePipe,
        PicturePipe,
        VideoPipe,
        MentionedPipe
    ],
    entryComponents: [],
    declarations: [
        FromDatePipe,
        PicturePipe,
        VideoPipe,
        MentionedPipe
    ],
    providers: []
})

export class PipesModule {}
