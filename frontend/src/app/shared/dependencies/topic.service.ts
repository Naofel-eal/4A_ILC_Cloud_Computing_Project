import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiConstantsService } from '../constants/api-constants.service';
import { Bula } from '../models/Bula.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  public topics: any[];
  public bulasOfTopic: any[];
  public allTopicSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public allBulasOfTopicSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }

  public loadTopics() {
    this.topics = [];
    this.http.get(this.apiConstantsService.API_URL_BULA_ALL_HASHTAG).subscribe({
      next : (response : any) => {
        for (let topic of response['hashtags']) {
          this.topics.push({'hashtag': topic['hashtag'], 'number': topic['number']});
        }
        this.sortTopicsByNumber();
        this.allTopicSubject.next(this.topics);
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

  public loadAllBulasOfTopic(hashtag: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("hashtagId", hashtag);

    this.http.get(this.apiConstantsService.API_URL_BULA_HASHTAG, {params:queryParams}).subscribe({
      next : (response : any) => {
        this.bulasOfTopic = []
        for (let bula of response['bulas']) {
          this.bulasOfTopic.push(new Bula(bula['text'], bula['author'], bula['meows'], bula['rebulas'],  bula['date'], bula['id']));
        }
        this.sortBulasByDate();
        this.allBulasOfTopicSubject.next(this.bulasOfTopic);
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

  public getAllTopics(): Observable<any[]> {
    return this.allTopicSubject.asObservable();
  }

  public getAllBulasOfTopic(): Observable<any[]> {
    return this.allBulasOfTopicSubject.asObservable();
  }

  private sortTopicsByNumber() {
    this.topics.sort((a: any, b: any) => {
      return b.number - a.number;
    });
  }

  public sortBulasByDate() {
    this.bulasOfTopic = this.bulasOfTopic.sort((a: Bula, b: Bula) => {
      const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
      return dateB.getTime() - dateA.getTime();
    });
  }

}