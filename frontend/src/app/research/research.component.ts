import { Component } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstantsService } from '../shared/constants/api-constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent {
  public bulas: Bula[] = [];
  public users: string[] = []

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService, private router: Router) { }

  public onTextChanged(event: any) {
    const text: string = event.target.value;
    if(text != '') {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("text", text);
  
      this.http.get(this.apiConstantsService.API_URL_BULA_RESEARCH, {params:queryParams}).subscribe({
        next : (response : any) => {
          this.users = response['users'];
          this.bulas = [];
          for (let bula of response['bulas']) {
            this.bulas.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']));
          }
          this.sortBulasByDate();
        },
        error : (error) => {
          console.log("error", error.status)
        }
      });
    }
    else {
      this.bulas = [];
      this.users = [];
    }
  }

  public sortBulasByDate() {
    this.bulas = this.bulas.sort((a: Bula, b: Bula) => {
      const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  public onUserClicked(username: string) {
    this.router.navigate(['/profile', username]);
  }
}
