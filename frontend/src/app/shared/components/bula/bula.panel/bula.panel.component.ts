import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { Bula } from '../../../models/Bula.model';

@Component({
  selector: 'app-bula-panel',
  templateUrl: './bula.panel.component.html',
  styleUrls: ['./bula.panel.component.css']
})
export class BulaPanelComponent implements OnInit{
  @Input() bula: Bula;
  @Input() type: string;
  public data: string[];

  @Output() closeComponent = new EventEmitter<boolean>();

  ngOnInit() {
    this.data = this.type == 'Meows' ? this.bula.meows : this.bula.rebulas;
  }

  public closeComponentCreateBula() {
    this.closeComponent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeComponentCreateBula();
  }
}
