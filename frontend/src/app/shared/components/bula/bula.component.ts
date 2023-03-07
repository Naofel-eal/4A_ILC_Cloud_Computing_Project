import { Component, Input } from '@angular/core';
import { Bula } from '../../models/Bula.model';
import { ApiConstantsService } from '../../constants/api-constants.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bula',
  templateUrl: './bula.component.html',
  styleUrls: ['./bula.component.css']
})
export class BulaComponent {
  @Input() bula: Bula;
  public isBulaMeowed: boolean = false;
  public isBulaRebuled: boolean = false;

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }

  public onMeow() {
    if(!this.isBulaMeowed) {
      const formData = new FormData();
      formData.append('bulaId', this.bula.id);
      this.http.post(this.apiConstantsService.API_URL_BULA_MEOW, formData).subscribe({
        next : (response : any) => {
          this.bula.meows ++;
          this.isBulaMeowed = true;
        },
        error : (error) => {
          console.log(error.status)
        }
      });
    }
    
  }

  public onRebula() {
    if(!this.isBulaRebuled) {
      const formData = new FormData();
      formData.append('bulaId', this.bula.id);
      this.http.post(this.apiConstantsService.API_URL_BULA_REBULA, formData).subscribe({
        next : (response : any) => {
          this.bula.rebulas ++;
          this.isBulaRebuled = true;
        },
        error : (error) => {
          console.log(error.status)
        }
      });
    }
  }
}
