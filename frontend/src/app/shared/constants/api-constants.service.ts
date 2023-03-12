import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiConstantsService {

  readonly API_URL = 'http://127.0.0.1:8888';

  readonly API_URL_USER_LOGIN = this.API_URL + '/user/login';
  readonly API_URL_USER_REGISTER = this.API_URL + '/user/register';
  
  readonly API_URL_BULA_ALL_BULAS = this.API_URL + '/bula/all-bulas';
  readonly API_URL_BULA_USER_BULAS = this.API_URL + '/bula/user-bulas';
  readonly API_URL_BULA_POST_BULA = this.API_URL + '/bula/post-bula';
  readonly API_URL_BULA_REBULA = this.API_URL + '/bula/rebula';
  readonly API_URL_BULA_UNREBULA = this.API_URL + '/bula/unrebula'
  readonly API_URL_BULA_MEOW = this.API_URL + '/bula/meow';
  readonly API_URL_BULA_UNMEOW = this.API_URL + '/bula/unmeow'
  readonly API_URL_BULA_HASHTAG = this.API_URL + '/bula/hashtag';
  readonly API_URL_BULA_ALL_HASHTAG = this.API_URL + '/bula/all-hashtags';
  readonly API_URL_BULA_RESEARCH = this.API_URL + '/bula/research'
}