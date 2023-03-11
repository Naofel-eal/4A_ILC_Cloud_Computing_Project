import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/shared/dependencies/topic.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {
  
  public topicsList: string[] = [];

  constructor(private router: Router, public topicService: TopicService) {
    this.topicService.getAllTopics().subscribe((topics) => {
      this.topicsList = topics.filter((topic) => topic.hasOwnProperty('hashtag'))
                              .slice(0, 10)
                              .map((topic) => topic['hashtag']);
    });
  }

  ngOnInit(): void {
    this.topicService.loadTopics();
  }

  public onClickTopic(hashtag : string) {
    this.router.navigate(['/topic', hashtag]);
  }

}
