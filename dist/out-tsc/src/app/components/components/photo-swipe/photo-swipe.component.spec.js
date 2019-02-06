"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var photo_swipe_component_1 = require("./photo-swipe.component");
// ========================================================================
describe('PhotoSwipeComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [photo_swipe_component_1.PhotoSwipeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(photo_swipe_component_1.PhotoSwipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    // ========================================================================
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
    // ========================================================================
});
//# sourceMappingURL=photo-swipe.component.spec.js.map