import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { HttpClient } from '@angular/common/http';
import { ApiConstantsService } from '../shared/constants/api-constants.service';
import { BulaService } from '../shared/dependencies/bula.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
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