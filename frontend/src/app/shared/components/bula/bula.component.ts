import { Component, Input } from '@angular/core';
import { Bula } from '../../models/Bula.model';

@Component({
  selector: 'app-bula',
  templateUrl: './bula.component.html',
  styleUrls: ['./bula.component.css']
})
export class BulaComponent {
  @Input() bula: Bula;
}
