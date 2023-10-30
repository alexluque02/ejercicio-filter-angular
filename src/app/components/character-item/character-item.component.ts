import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters.interface';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent {

  @Input() character!: Character;

}
