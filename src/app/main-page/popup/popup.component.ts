import { MatButtonModule } from '@angular/material/button';
import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogModule, MatDialogTitle, MatButtonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pokemon :any}) {}

  showShiny:boolean = false

  ngOnInit() {
    console.log(this.data.pokemon, 'passed in values')
    //this.data.pokemon.moves = []
  }

  setShowShiny() {
    this.showShiny = true
  }

  setHideShiny() {
    this.showShiny = false
  }
}
