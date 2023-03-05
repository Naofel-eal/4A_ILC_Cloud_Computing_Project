import { Component } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public isCreateBulaVisible = false;

  public close_create_bula(isVisible : boolean) {
    this.isCreateBulaVisible = isVisible;
  }

  public switch_create_bula_visibility() {
    this.isCreateBulaVisible = !this.isCreateBulaVisible;
  }

  public bulas: Bula[] = [
    new Bula(
      "On rigole on rigole mais vous avez déjà vu des chinois à une pompe à essence ? #LesChinoisRestezOuVousEtes et #masterclass",
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
    )
  ];
}
