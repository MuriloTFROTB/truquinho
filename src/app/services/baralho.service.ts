import { Injectable } from '@angular/core';
import { Carta } from './carta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaralhoService {

  constructor() { }

  createGame() {
    //criar o baralho

    const naipes = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
    const values = ["♦️", "♠️", "♥️", "♣️",];
    let power = 0;

    const deck: Carta[] = [];
    for (let naipe of naipes) {
      power++
      for (let value of values) {

        const carta: Carta = {
          naipe: naipe,
          valor: value,
          powerNaipe: 0,
          powerValue: power
        }
        deck.push(carta);
      }
    }

    //tirar a manilha
    const randomIndex = Math.floor(Math.random() * deck.length);
    const vira = deck.splice(randomIndex, 1)[0];


    //dar valor as manilhas


    console.log("Esta carta e o vira", vira);


    if (vira && vira.powerValue !== undefined) {
      const manilha = vira.powerValue + 1;
      console.log("Manilha:", manilha);

      // Ajustar os valores do powerValue das cartas no deck
      deck.forEach(carta => {
        if (carta.powerValue === manilha) {
          carta.powerValue = manilha + 20;
        }
      });

      console.log("Deck com powerValue ajustado:", deck);
    } else {
      console.error("Carta vira inválida ou sem powerValue definido.");
    }

    return { deck, vira }
  }
  DistribuirCartas(baralho: Carta[], numberCards: number, numberPlayers: number): Carta[][] {
    const maosJogadores: Carta[][] = [];
    for (let jogador = 0; jogador < numberPlayers; jogador++) {
      maosJogadores.push([]);
    }

    for (let i = 0; i < numberCards; i++) {
      for (let jogador = 0; jogador < numberPlayers; jogador++) {
        const randomIndex = Math.floor(Math.random() * baralho.length);
        const carta = baralho.splice(randomIndex, 1)[0];
        maosJogadores[jogador].push(carta);
      }
    }

    return maosJogadores;
  }
  CompararCartas(cartaJogador1: Carta, cartaJogador2: Carta): void {
    const pontoNaipeP1: number = cartaJogador1.powerValue;
    const pontoNaipeP2: number = cartaJogador2.powerValue;

    if (pontoNaipeP1 > pontoNaipeP2) {
      console.log('Jogador 1 venceu');
    } else if (pontoNaipeP2 > pontoNaipeP1) {
      console.log('Jogador 2 venceu');
    } else {
      console.log('Empate');
    }
  }
}
