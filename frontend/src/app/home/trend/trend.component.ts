import { Component } from '@angular/core';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent {
  public topicList: string[] = [
    '#PouletFrit', 
    '#ChatMignon', 
    '#PandaRouge', 
    '#FlemmeOlympiqueCestChaud', 
    '#PatateChaude', 
    '#CactusAgressif', 
    '#PoissonChatouilleur', 
    '#BananeCroustillante', 
    '#HibouEnervé', 
    '#LicorneEnchantée'
  ];
}
