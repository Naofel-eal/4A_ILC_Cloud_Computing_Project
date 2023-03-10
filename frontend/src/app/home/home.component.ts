import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { HttpClient } from '@angular/common/http';
import { ApiConstantsService } from '../shared/constants/api-constants.service';
import { HomeService } from '../shared/dependencies/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService, public homeService: HomeService) { 
    this.homeService.getBulas().subscribe((bulas) => {
      this.bulas = bulas;
    });
  }
  
  public bulas: Bula[] = []

  ngOnInit(): void {
    this.homeService.loadAllBulas();
  }
}