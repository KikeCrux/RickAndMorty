import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailComponent } from './characters-detail/characters-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'characters',
        component: CharactersComponent
    },
    {
        path: 'characters/:id',
        component: CharactersDetailComponent
    }

];
