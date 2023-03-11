import { Injectable } from "@angular/core";
import { Bula } from "../models/Bula.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiConstantsService } from "../constants/api-constants.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class BulaService {
    constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) {}

    public allBulas: Bula[];
    public userBulas: Bula[];
    public allBulasSubject: BehaviorSubject<Bula[]> = new BehaviorSubject<Bula[]>([]);
    public userBulasSubject: BehaviorSubject<Bula[]> = new BehaviorSubject<Bula[]>([]);

    public loadAllBulas() {
      this.http.get(this.apiConstantsService.API_URL_BULA_ALL_BULAS).subscribe({
        next : (response : any) => {
          this.allBulas = []
          for (let bula of response['bulas']) {
            this.allBulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']))
          }
          this.allBulas = this.sortBulasByDate(this.allBulas);
          this.allBulasSubject.next(this.allBulas);
        },
        error : (error) => {
          console.log("error", error.status)
        }
      });
    }

  public sortBulasByDate(bulas: Bula[]): Bula[] {
    return bulas.sort((a: Bula, b: Bula) => {
      const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  public getAllBulas(): Observable<Bula[]> {
    return this.allBulasSubject.asObservable();
  }

  public loadUserBulas(userId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);

    this.http.get(this.apiConstantsService.API_URL_BULA_USER_BULAS, {params: queryParams}).subscribe({
      next : (response : any) => {
        this.userBulas = []
        for (let bula of response['bulas']) {
          this.userBulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']))
        }
        this.userBulas = this.sortBulasByDate(this.userBulas);
        this.userBulasSubject.next(this.userBulas);
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

  public getUserBulas(): Observable<Bula[]> {
    return this.userBulasSubject.asObservable();
  }
}
