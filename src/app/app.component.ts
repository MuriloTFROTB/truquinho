import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JogoComponent } from './components/jogo/jogo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trucov2';
}
