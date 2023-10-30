import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterListResponse } from '../models/characters.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacterPage(page: number): Observable<CharacterListResponse> {
    return this.http.get<CharacterListResponse>("https://rickandmortyapi.com/api/character/?page=" + page);
  }

  getCharacterList(): Observable<CharacterListResponse> {
    return this.http.get<CharacterListResponse>("https://rickandmortyapi.com/api/character");
  }
}
