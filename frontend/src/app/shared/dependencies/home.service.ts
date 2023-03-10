import { Injectable } from "@angular/core";
import { Bula } from "../models/Bula.model";
import { HttpClient } from "@angular/common/http";
import { ApiConstantsService } from "../constants/api-constants.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class HomeService {
    constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) {}

    public bulas: Bula[];
    public bulasSubject: BehaviorSubject<Bula[]> = new BehaviorSubject<Bula[]>([]);

    public loadAllBulas() {
    this.http.get(this.apiConstantsService.API_URL_BULA_ALL_BULAS).subscribe({
      next : (response : any) => {
        this.bulas = []
        for (let bula of response['bulas']) {
          this.bulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']))
        }
        this.sortBulasByDate();
        this.bulasSubject.next(this.bulas);
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

  public getBulas(): Observable<Bula[]> {
    return this.bulasSubject.asObservable();
  }
}
