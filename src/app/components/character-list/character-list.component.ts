import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Character, CharacterListResponse, Info } from 'src/app/models/characters.interface';
import { CharacterFilterService } from 'src/app/services/character-filter.service';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characterList: Character[] = [];
  page = 1;
  count: number = 0;
  filteredOptions!: Observable<Character[]>;
  myControl = new FormControl<string | Character>('');
  options: Character[] = [];
  modalService: any;
  showAll: boolean = true;
  selectedCharacter!: Character;

  constructor(private serviceCharac: CharactersService, private serviceFilter: CharacterFilterService) { }


  ngOnInit(): void {
    this.loadNewPage();
    this.serviceFilter.getCharactersFiltered().subscribe(resp => {
      this.options = resp.results;
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  loadNewPage() {
    this.serviceCharac.getCharacterPage(this.page).subscribe(resp => {
      this.characterList = resp.results;
    });
    this.serviceCharac.getCharacterList().subscribe(resp =>
      this.count = resp.info.count);
  }

  showDetails(character: Character) {
    this.serviceFilter.getCharacter(character.id).subscribe(characterDetails => {
      this.selectedCharacter = characterDetails;
    });
  }

  displayFn(character: Character): string {
    return character.name && character ? character.name : '';
  }

  private _filter(name: string): Character[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }



}


