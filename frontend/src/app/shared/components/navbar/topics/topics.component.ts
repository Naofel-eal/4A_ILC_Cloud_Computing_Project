import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/shared/dependencies/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public topics: any[];
  @Output() closeComponent = new EventEmitter<boolean>();

  constructor(private router: Router, public topicService: TopicService) {
    this.topicService.getAllTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }

  ngOnInit(): void {
    this.topicService.loadTopics();
  }

  public closeComponentTopics() {
    this.closeComponent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeComponentTopics();
  }

  public onClickTopic(hashtag : string) {
    this.router.navigate(['/topic', hashtag]);
    this.closeComponent.emit(false);
  }

}
