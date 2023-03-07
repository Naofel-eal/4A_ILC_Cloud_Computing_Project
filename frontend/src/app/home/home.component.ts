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
  
  public bulas: Bula[] = []/* [
    new Bula(
      "On rigole on rigole mais vous avez déjà vu des chinois à une pompe à essence ? #LesChinoisRestezOuVousEtes #masterclass",
      "pessi2012",
      1251,
      433
    ),
    new Bula(
      "Les raclis de ce réseau on dirait on leur a interdit de dire des choses censées et intelligentes #antiRacli #MaisPasAntiRaclette",
      "pessi2012",
      888,
      223
    ),
    new Bula(
      "Macaque à vendre 4000€ cash. reste plus rien presque #LesChinoisRestezOuVousEtes",
      "pessi2012",
      1251,
      433
    ),
    new Bula(
      "On rigole on rigole mais vous avez déjà vu des chinois à une pompe à essence ? #LesChinoisRestezOuVousEtes #masterclass",
      "pessi2012",
      1251,
      433
    ),
    new Bula(
      "Les raclis de ce réseau on dirait on leur a interdit de dire des choses censées et intelligentes #antiRacli #MaisPasAntiRaclette",
      "pessi2012",
      888,
      223
    ),
    new Bula(
      "Macaque à vendre 4000€ cash. reste plus rien presque #LesChinoisRestezOuVousEtes",
      "pessi2012",
      1251,
      433
    ),
    new Bula(
      "On rigole on rigole mais vous avez déjà vu des chinois à une pompe à essence ? #LesChinoisRestezOuVousEtes #masterclass",
      "pessi2012",
      1251,
      433
    ),
    new Bula(
      "Les raclis de ce réseau on dirait on leur a interdit de dire des choses censées et intelligentes #antiRacli #MaisPasAntiRaclette",
      "pessi2012",
      888,
      223
    ),
    new Bula(
      "Macaque à vendre 4000€ cash. reste plus rien presque #LesChinoisRestezOuVousEtes",
      "pessi2012",
      1251,
      433
    ),
  ];*/
  public isCreateBulaVisible = false;

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

  public close_create_bula(isVisible : boolean) {
    this.isCreateBulaVisible = isVisible;
  }

  public switch_create_bula_visibility() {
    this.isCreateBulaVisible = !this.isCreateBulaVisible;
  }
}
