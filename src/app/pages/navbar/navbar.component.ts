import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() openModal = new EventEmitter<void>();

  onOpenModal() {
    this.openModal.emit();
  }

}
