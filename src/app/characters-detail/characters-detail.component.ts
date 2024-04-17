import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RicknmortyApiService } from '../ricknmorty-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [RicknmortyApiService],
  templateUrl: './characters-detail.component.html',
  styleUrl: './characters-detail.component.css'
})
export class CharactersDetailComponent {
  character: any;

  constructor(private route: ActivatedRoute, private ricknmortyService: RicknmortyApiService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ricknmortyService.getCharacterById(id).subscribe(character => {
      this.character = character;
    });
  }

}
