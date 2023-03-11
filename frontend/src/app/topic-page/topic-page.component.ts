import { Component, OnInit } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from '../shared/dependencies/topic.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit{

  public hashtag = '';
  public bulas: Bula[];

  constructor(private route: ActivatedRoute, private topicService: TopicService, private titleService: Title) {
    this.topicService.getAllBulasOfTopic().subscribe((bulas) => {
      this.bulas = bulas;
    });

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
        this.hashtag = ""+params.get('hashtag');
        this.topicService.loadAllBulasOfTopic(this.hashtag);
        this.titleService.setTitle("Bula - " + this.hashtag);
    });
  }

}