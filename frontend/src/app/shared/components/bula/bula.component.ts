import { Component, Input, OnInit } from '@angular/core';
import { Bula } from '../../models/Bula.model';
import { ApiConstantsService } from '../../constants/api-constants.service';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-bula',
  templateUrl: './bula.component.html',
  styleUrls: ['./bula.component.css']
})
export class BulaComponent implements OnInit {
  @Input() bula: Bula;

  public isBulaMeowed: boolean = false;
  public isBulaRebuled: boolean = false;

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }

  ngOnInit(): void {
    this.isBulaMeowed = this.bula.meows.includes(this.getUserId());
    this.isBulaRebuled = this.bula.rebulas.includes(this.getUserId());
  }

  public onMeowBtnClicked() {
    this.isBulaMeowed ? this.unMeow() : this.meow();
  }

  public onRebulaBtnClicked() {
    this.isBulaRebuled ? this.unRebula() : this.rebula();
  }
  
  public meow() {
    if(!this.isBulaMeowed) {
      const formData = new FormData();
      formData.append('bulaId', this.bula.id);
      this.http.post(this.apiConstantsService.API_URL_BULA_MEOW, formData).subscribe({
        next : (response : any) => {
          this.bula.meows.push(this.getUserId());
          this.isBulaMeowed = true;
        },
        error : (error) => {
          console.log(error.status)
        }
      });
    }
  }

  public rebula() {
    if(!this.isBulaRebuled) {
      const formData = new FormData();
      formData.append('bulaId', this.bula.id);
      this.http.post(this.apiConstantsService.API_URL_BULA_REBULA, formData).subscribe({
        next : (response : any) => {
          this.bula.rebulas.push(this.getUserId());
          this.isBulaRebuled = true;
        },
        error : (error) => {
          console.log(error.status)
        }
      });
    }
  }

  public unMeow() {
    const formData = new FormData();
    formData.append('bulaId', this.bula.id);
    this.http.post(this.apiConstantsService.API_URL_BULA_UNMEOW, formData).subscribe({
      next : (response : any) => {
        const removeString = (arr: string[], str: string): string[] => {
          return arr.filter((item) => item !== str);
        };
        
        this.bula.meows = removeString(this.bula.meows, this.getUserId());
        this.isBulaMeowed = false;
      },
      error : (error) => {
        console.log(error.status)
      }
    });
  }

  public unRebula() {
    const formData = new FormData();
    formData.append('bulaId', this.bula.id);
    this.http.post(this.apiConstantsService.API_URL_BULA_UNREBULA, formData).subscribe({
      next : (response : any) => {
        const removeString = (arr: string[], str: string): string[] => {
          return arr.filter((item) => item !== str);
        };
        
        this.bula.rebulas = removeString(this.bula.rebulas, this.getUserId());
        this.isBulaRebuled = false;
      },
      error : (error) => {
        console.log(error.status)
      }
    });
  }

  public getUserId(): string {
    const token: string = localStorage.getItem("token")!
    return token.split("/")[1]
  }
}
