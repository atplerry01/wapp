import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive(
    { 
        selector: '[preventCutCopyCutPaste]' 
    }
)

export class PreventCopyCutDirective {
    constructor(el: ElementRef, renderer: Renderer) {
     // const events = 'cut copy paste';
      const events = 'cut copy';
      events.split(' ').forEach(e => 
      renderer.listen(el.nativeElement, e, (event) => {
        event.preventDefault();
        })
      );

    }
}