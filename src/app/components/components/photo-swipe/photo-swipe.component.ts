import { Component, ViewChild, ElementRef, Input } from '@angular/core';

// Import PhotoSwipe
import PhotoSwipe           from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

// Image Interface
import { PhotoSwipeImage } from '../../../models/global/photoSwipeImage';

@Component({
    selector   : 'app-photo-swipe',
    templateUrl: './photo-swipe.component.html',
    styleUrls  : ['./photo-swipe.component.css']
})
export class PhotoSwipeComponent
{
    @ViewChild('photoSwipe') photoSwipe: ElementRef;

    @Input() images: PhotoSwipeImage[] = [];

    // ========================================================================
    constructor() { }

    // ========================================================================
    openGallery(images?: PhotoSwipeImage[], index:number=0)
    {
        // Build gallery images array
        images = images || this.images;

        // define options (if needed)
        const options = {
            // optionName: 'option value'
            // for example:
            index: index // start at first slide
        };

        // Initializes and opens PhotoSwipe
        const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        gallery.init();
    }
    // ========================================================================
}
