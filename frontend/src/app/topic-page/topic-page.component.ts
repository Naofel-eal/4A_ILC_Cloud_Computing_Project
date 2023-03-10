import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstantsService } from '../shared/constants/api-constants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService, private route: ActivatedRoute) { }
  
  public hashtag = '';
  public bulas: Bula[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.hashtag = ""+params.get('hashtag');
      this.loadAllBulas();
    });
  }

  public loadAllBulas() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("hashtagId", this.hashtag);

    this.http.get(this.apiConstantsService.API_URL_BULA_HASHTAG, {params:queryParams}).subscribe({
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
