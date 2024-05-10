import { Component,DoCheck } from '@angular/core';
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
  cartaJ1?: Carta;
  cartaJ2?: Carta;

  playerOneWin=true
  playerTwoWin=false
  start=true
  
  resultado: string | null = null;


  pontosPlayerOne: number = 0;
  pontosPlayerTwo: number = 0;


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
   if(!this.start){
    return
   }
    this.cartaJ1 = carta;
    this.maoJogador1.splice(index, 1);
    this.start=false
    this.playerTwoWin=true
  }

  selecionarCartaJ2(carta: Carta, index: number): void {
    if(!this.playerTwoWin){
      return
    }
    this.cartaJ2 = carta;
    this.maoJogador2.splice(index, 1);
    this.start=true
    this.playerTwoWin=false
  }

  ngDoCheck(): void {

    if ( this.cartaJ1 && this.cartaJ2) {
      this.comparaCartas();
    }
    
  }
  
  comparaCartas() {

    if (this.cartaJ1 && this.cartaJ2) {
      if (this.cartaJ1.powerValue > this.cartaJ2.powerValue) {
        this.resultado = 'jogador 1 ganhou';
        this.pontosPlayerOne++;
        this.start=true
        this.pontosPlayerTwo=null!

      } else if (this.cartaJ1.powerValue < this.cartaJ2.powerValue) {
        this.resultado = 'jogador 2 ganhou';
        this.pontosPlayerTwo++;
        this.playerTwoWin=true
        this.start=null!
        
      } else {
        this.resultado = 'empate';
      }
    }
    this.cartaJ1=null!
    this.cartaJ2=null!
    // Verifica se algum jogador atingiu dois pontos
    if (this.pontosPlayerOne === 2) {
      this.resultado = 'Player 1 venceu';
    } else if (this.pontosPlayerTwo === 2) {
      this.resultado = 'Player 2 venceu';
    }
    console.log(this.cartaJ1)
    console.log(this.pontosPlayerOne)
  }

}
