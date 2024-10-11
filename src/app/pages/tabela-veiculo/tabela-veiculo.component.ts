import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TabelaVeiculoService } from '../../services/tabela-veiculo/tabela-veiculo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { Subject } from 'rxjs';
// import { Config } from 'datatables.net';
// import { DataTableDirective } from 'angular-datatables';

// import * as $ from 'jquery';
import { Veiculos } from '../../models/veiculos';

@Component({
  selector: 'app-tabela-veiculo',
  templateUrl: './tabela-veiculo.component.html',
  styleUrl: './tabela-veiculo.component.css'
})
export class TabelaVeiculoComponent implements OnInit {

  modalRef?: BsModalRef;
  @Input() showModal: boolean = false;

  veiculosData: Veiculos[] = [];

  totalVeiculos: number = 0;
  page: number = 1;

  constructor(
    private _tabelaVeiculoService: TabelaVeiculoService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.veiculos();
  }

  veiculos() {
    this._tabelaVeiculoService.veiculos().subscribe((response) => {
      this.veiculosData = response;
      this.totalVeiculos = this.veiculosData.length;
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

}
