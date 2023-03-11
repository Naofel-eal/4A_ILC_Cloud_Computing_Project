import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { BulaService } from '../shared/dependencies/bula.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public bulas: Bula[];

  constructor(public bulaService: BulaService) { 
    this.bulaService.getAllBulas().subscribe((bulas) => {
      this.bulas = bulas;
    });
  }

  ngOnInit(): void {
    this.bulaService.loadAllBulas();
  }
}