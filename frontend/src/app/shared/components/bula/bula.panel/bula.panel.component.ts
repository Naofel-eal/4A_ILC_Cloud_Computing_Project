import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { Bula } from '../../../models/Bula.model';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.data = this.type == 'Meows' ? this.bula.meows : this.bula.rebulas;
  }

  public closeComponentList() {
    this.closeComponent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeComponentList();
  }

  public onUserClicked() {
    this.router.navigate(['/profile', this.bula.author]);
  }

  public onClickProfile(userId: string) {
    this.router.navigate(['/profile', userId]);
  }
}
