import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicknmortyApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}character`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}character/${id}`);
  }

  getAllEpisodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode`);
  }

  getEpisodeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode/${id}`);
  }

  getAllCharactersForPage(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}character?page=${page}`);
  }

  getAliveCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?status=alive&page=${page}`);
  }

  getDeadCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?status=dead&page=${page}`);
  }

  getUnknownCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?status=unknown&page=${page}`);
  }

  getMaleCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?gender=male&page=${page}`);
  }

  getFemaleCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?gender=female&page=${page}`);
  }

  getUnknownGenderCharactersForPage(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?gender=unknown&page=${page}`);
  }


}
