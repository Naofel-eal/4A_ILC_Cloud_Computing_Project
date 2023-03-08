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

  ngOnInit(): void {
    this.loadAllBulas();
  }

  public close_create_bula(isBulaPosted: boolean) {
    this.isCreateBulaVisible = false;
    if(isBulaPosted) {
      this.loadAllBulas();
    }
  }

  public switch_create_bula_visibility() {
    this.isCreateBulaVisible = !this.isCreateBulaVisible;
  }

  public loadAllBulas() {
    this.http.get(this.apiConstantsService.API_URL_BULA_ALL_BULAS).subscribe({
      next : (response : any) => {
        this.bulas = []
        for (let bula of response['bulas']) {
          this.bulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']))
        }
        this.sortBulasByDate();
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

  public sortBulasByDate() {
    this.bulas = this.bulas.sort((a: Bula, b: Bula) => {
      const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      return dateB.getTime() - dateA.getTime();
    });
  }

}
