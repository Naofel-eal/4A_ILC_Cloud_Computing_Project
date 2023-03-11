import { Component } from '@angular/core';
import { Bula } from '../shared/models/Bula.model';
import { BulaService } from '../shared/dependencies/bula.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  public userId: string;
  public bulas: Bula[] = []

  constructor(public bulaService: BulaService, private route: ActivatedRoute, private titleService: Title) { 
    this.bulaService.getUserBulas().subscribe((bulas) => {
      this.bulas = bulas;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
        this.userId = "" + params.get("userId")
        this.titleService.setTitle("Bula - @" + this.userId);
        this.bulaService.loadUserBulas(this.userId);
      }
    );
  }
}
