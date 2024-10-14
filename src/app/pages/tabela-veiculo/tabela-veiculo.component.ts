import { Component, Input, OnInit, TemplateRef, ViewChild, HostListener, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TabelaVeiculoService } from '../../services/tabela-veiculo/tabela-veiculo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Veiculos } from '../../models/veiculos';

@Component({
  selector: 'app-tabela-veiculo',
  templateUrl: './tabela-veiculo.component.html',
  styleUrl: './tabela-veiculo.component.css'
})
export class TabelaVeiculoComponent implements OnInit {

  modalRef?: BsModalRef;
  @Input() showModal: boolean = false;
  @Output() modalFechado = new EventEmitter<void>();

  veiculosData: Veiculos[] = [];

  totalVeiculos: number = 0;
  page: number = 1;

  @ViewChild('template') template: TemplateRef<any>;

  constructor(
    private _tabelaVeiculoService: TabelaVeiculoService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.veiculos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("teste");
    if (changes['showModal'] && this.showModal) {
      this.openModal();
    }
  }

  veiculos() {
    this._tabelaVeiculoService.veiculos().subscribe((response) => {
      this.veiculosData = response;
      this.totalVeiculos = this.veiculosData.length;
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, {
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal() {
    this.modalRef?.hide();
    this.showModal = false;
    this.modalFechado.emit();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (this.modalRef?.content && !target.closest('.modal-content')) {
      this.closeModal();
    }
  }
}
