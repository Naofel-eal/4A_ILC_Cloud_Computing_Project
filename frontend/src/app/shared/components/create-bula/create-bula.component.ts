import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConstantsService } from '../../constants/api-constants.service';

@Component({
  selector: 'app-create-bula',
  templateUrl: './create-bula.component.html',
  styleUrls: ['./create-bula.component.css']
})
export class CreateBulaComponent {

  constructor(private http: HttpClient, private apiConstantsService: ApiConstantsService) { }
  public bulaText = '';
  public nbCharacters = 0;
  private linesLimit: number = 6;

  @Output() closeComponent = new EventEmitter<boolean>();

  public closeComponentCreateBula() {
    this.closeComponent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeComponentCreateBula();
  }

  public bula() {
    const formData = new FormData();
    formData.append('text', this.bulaText);

    this.http.post(this.apiConstantsService.API_URL_BULA_POST_BULA, formData).subscribe({      
      next : (response : any) => {
        this.closeComponentCreateBula();
      },

      error : (error) => {
        console.log(error.status);
      }
    });
  }

  public checkText(event: any) {
    if (event.inputType === "insertLineBreak") {
      this.bulaText = this.bulaText.replace(/\n/g, " ");
    }
    this.nbCharacters = this.bulaText.length;
  }
}
 