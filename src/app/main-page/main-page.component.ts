import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { MaterialModule } from '../material/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from './popup/popup.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatFormFieldModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  pokemonData: any = {}
  dataSource: any = []
  listofSprites: string[] = ["https://raw.githubusercontent.com/PokeAPI/master/sprites/pokemon/376.png",]
  displayedColumns: string[] = ['Name', 'Picture', 'Type', 'PokedexNumber', 'Region', 'popup'];

  constructor(private service: ServiceService, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(){
    this.getAllPokemonData();
  }

  getAllPokemonData() {
    this.service.getAllPokemonData().subscribe({
      next: (res: any) => {
        console.log(res, "The pokemon data from api")
        this.pokemonData = res
        let cnt = 0
        this.pokemonData.map((x:any) => {
          let imgUrl = this.listofSprites[cnt]
          cnt++
          return x.frontImg = imgUrl
        })
        console.log("PokemonObj", this.pokemonData)
        this.dataSource.data = this.pokemonData
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPopup(pokemon:any){
    this.service.getPokemonData(pokemon.pokedexNumber).subscribe({
      next: (res:any) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '700px';
        dialogConfig.height = '700px';
        dialogConfig.data = {
          pokemon: res
        }
        if(this.dialog.openDialogs.length == 0) {
          const dialogRef = this.dialog.open(PopupComponent, dialogConfig)
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result:, ${result}`);
          });
        }
      }
    })
  }
}
