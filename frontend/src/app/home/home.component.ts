import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { HttpClient } from '@angular/common/http';
import { ApiConstantsService } from '../shared/constants/api-constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }
  
  public bulas: Bula[] = []
  public isCreateBulaVisible = false;
  public isTopicsVisible = false;

  ngOnInit(): void {
    this.http.get(this.apiConstantsService.API_URL_BULA_ALL_BULAS).subscribe({
      next : (response : any) => {
        for (let bula of response['bulas']) {
          this.bulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas']))
        }
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

}