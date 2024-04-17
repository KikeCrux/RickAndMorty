import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RicknmortyApiService } from '../ricknmorty-api.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [RicknmortyApiService],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {

  isPortalActive: boolean = false;
  characters: any;
  genders: any;
  filteredCharacters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageToGo: number = 1;
  currentFilter: string = '';

  constructor(private ricknmortyService: RicknmortyApiService) { }

  ngOnInit(): void {
    this.loadFilteredCharacters(this.currentPage);
  }

  loadFilteredCharacters(page: number): void {
    let charactersObservable: Observable<any>;

    if (this.currentFilter) {
      switch (this.currentFilter) {
        case 'status_alive':
          charactersObservable = this.ricknmortyService.getAliveCharactersForPage(page);
          break;
        case 'status_dead':
          charactersObservable = this.ricknmortyService.getDeadCharactersForPage(page);
          break;
        case 'status_unknown':
          charactersObservable = this.ricknmortyService.getUnknownCharactersForPage(page);
          break;
        case 'gender_male':
          charactersObservable = this.ricknmortyService.getMaleCharactersForPage(page);
          break;
        case 'gender_female':
          charactersObservable = this.ricknmortyService.getFemaleCharactersForPage(page);
          break;
        case 'gender_unknown':
          charactersObservable = this.ricknmortyService.getUnknownGenderCharactersForPage(page);
          break;
        default:
          charactersObservable = this.ricknmortyService.getAllCharactersForPage(page);
          break;
      }
    } else {
      charactersObservable = this.ricknmortyService.getAllCharactersForPage(page);
    }

    charactersObservable.subscribe(data => {
      this.characters = data;
      this.filteredCharacters = data.results;
      this.totalPages = data.info.pages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadFilteredCharacters(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFilteredCharacters(this.currentPage);
    }
  }

  goToPage(): void {
    if (this.pageToGo >= 1 && this.pageToGo <= this.totalPages) {
      this.currentPage = this.pageToGo;
      this.loadFilteredCharacters(this.currentPage);
    }
  }

  filterByStatus(status: string): void {
    switch (status) {
      case 'alive':
        this.currentFilter = 'status_alive';
        this.ricknmortyService.getAliveCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      case 'dead':
        this.currentFilter = 'status_dead';
        this.ricknmortyService.getDeadCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      case 'unknown':
        this.currentFilter = 'status_unknown';
        this.ricknmortyService.getUnknownCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      case 'reset':
        this.currentFilter = 'reset';
        this.ricknmortyService.getAllCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      default:
        this.loadFilteredCharacters(this.currentPage);
        break;
    }
  }

  filterByGender(gender: string): void {
    switch (gender) {
      case 'Male':
        this.currentFilter = 'gender_male';
        this.ricknmortyService.getMaleCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      case 'Female':
        this.currentFilter = 'gender_female';
        this.ricknmortyService.getFemaleCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      case 'unknown':
        this.currentFilter = 'gender_unknown';
        this.ricknmortyService.getUnknownGenderCharactersForPage(this.currentPage).subscribe(data => {
          this.characters = data;
          this.filteredCharacters = data.results;
          this.totalPages = data.info.pages;
        });
        break;
      default:
        this.loadFilteredCharacters(this.currentPage);
        break;
    }
  }

  activatePortal(character: any): void {
    character.isPortalActive = true;
  }

  deactivatePortal(character: any): void {
    character.isPortalActive = false;
  }

}
