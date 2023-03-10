import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstantsService } from '../../../constants/api-constants.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public topics: any[] = [];

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }

  @Output() closeComponent = new EventEmitter<boolean>();

  public closeComponentCreateBula() {
    this.closeComponent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeComponentCreateBula();
  }

  ngOnInit(): void {
    this.http.get(this.apiConstantsService.API_URL_BULA_ALL_HASHTAG).subscribe({
      next : (response : any) => {
        for (let topic of response['hashtags']) {
          this.topics.push({'hashtag': topic['hashtag'], 'number': topic['number']});
        }
      },
      error : (error) => {
        console.log("error", error.status)
      }
    });
  }

}
