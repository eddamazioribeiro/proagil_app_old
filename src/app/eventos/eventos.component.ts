import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = [];
  eventosFiltrados: any = [];
  imagemAltura = 50;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  _filtroBusca: string;
  get filtroBusca(): string{
    return this._filtroBusca;
  }
  set filtroBusca(value: string) {
    this._filtroBusca = value;
    this.eventosFiltrados =
      this.filtroBusca ? this.filtraEventos(this.filtroBusca) : this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.buscaTodosEventos();
    console.log('eventos', this.eventos);
  }

  filtraEventos(filtros: string): any {
    filtros = filtros.toLocaleLowerCase();

    return this.eventos.filter(evento =>
      evento.tema.toLocaleLowerCase().indexOf(filtros) !== -1);
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  buscaTodosEventos() {
    this.eventos = this.http.get('http://localhost:5000/api/eventos').subscribe(
      response => {
        this.eventos = this.eventosFiltrados = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
