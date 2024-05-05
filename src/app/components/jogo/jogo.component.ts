import { Component, } from '@angular/core';
import { BaralhoService } from '../../services/baralho.service';
import { Carta } from '../../services/carta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.scss'
})
export class JogoComponent {

  maoJogador1: Carta[] = [];
  maoJogador2: Carta[] = [];
  manilha?: Carta;
  jogador1Jogou: boolean = false;
  cartaJ1?: Carta;
  cartaJ2?: Carta;
  resultado: string | null = null;

  constructor(private truco: BaralhoService) {
  }
  ngOnInit(): void {
    const game = this.truco.createGame();
    console.log('jogo criado', game);

    const deck: Carta[] = game.deck;
    const maosJogadores = this.truco.DistribuirCartas(deck, 3, 2);
    console.log('maos dos jogadores', maosJogadores);

    this.maoJogador1 = maosJogadores[0];
    this.maoJogador2 = maosJogadores[1];

    this.manilha = game.vira;
  }

  selecionarCartaJ1(carta: Carta, index: number): void {
    this.cartaJ1 = carta;
    this.maoJogador1.splice(index, 1); // Remover a carta da mão do jogador 1
    this.jogador1Jogou = true
    console.log(this.cartaJ1);
  }

  selecionarCartaJ2(carta: Carta, index: number): void {
    if (!this.jogador1Jogou) {
      return;
    }

    this.cartaJ2 = carta;
    this.maoJogador2.splice(index, 1);
    this.jogador1Jogou = false
    console.log(this.cartaJ2);
    this.comparaCartas();
  }
  comparaCartas() {
    if (this.cartaJ1 && this.cartaJ2) {
      if (this.cartaJ1.powerValue > this.cartaJ2.powerValue) {
        this.resultado = 'jogador 1 ganhou';
      } else if (this.cartaJ1.powerValue < this.cartaJ2.powerValue) {
        this.resultado = 'jogador 2 ganhou';
      } else {
        this.resultado = 'empate';
      }
    }
  }

}
