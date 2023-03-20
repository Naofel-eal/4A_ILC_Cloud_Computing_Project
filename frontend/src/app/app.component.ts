import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { transition, query, trigger, style, animate, group } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
      group([
        query(':enter', [
          style({ opacity: '0.0' }),
          animate('0.1s ease-out', style({ opacity: '1.0' }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: '1.0' }),
          animate('0.1s ease-out', style({ opacity: '0.0' }))
        ], { optional: true })
      ])
    ])
  ])]
})
export class AppComponent {
  title = 'Bula';

  public onActivate() {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
  }
}
