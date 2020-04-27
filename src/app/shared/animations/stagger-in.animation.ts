// import the required animation functions from the angular animations module
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const staggerInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('staggerIn', [
        transition('* => *', [
  
          query(':enter', style({ opacity: 0 }), { optional: true }),
  
          query(':enter', stagger('200ms', [
            animate('.2s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateY(80%)', offset: 0 }),
              style({ opacity: .6, transform: 'translateY(35px)', offset: 0.2 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
            ]))]), { optional: true })
        ])
      ]);