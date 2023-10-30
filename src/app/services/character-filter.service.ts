import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, CharacterListResponse } from '../models/characters.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterFilterService {

  constructor(private http: HttpClient) { }

  getCharactersFiltered(): Observable<CharacterListResponse> {
    return this.http.get<CharacterListResponse>("https://rickandmortyapi.com/api/character");
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>("https://rickandmortyapi.com/api/character/" + id);
  }
}
