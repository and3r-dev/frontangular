import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  showModal: boolean = false;

  onOpenModal(): void {
    this.showModal = true;
  }

  onCloseModal(): void {
    this.showModal = false;
  }

}
