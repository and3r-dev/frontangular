import { Component, Input, OnInit, TemplateRef, ViewChild, HostListener, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TabelaVeiculoService } from '../../services/tabela-veiculo/tabela-veiculo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Veiculos } from '../../models/veiculos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  veiculosDataFiltered: Veiculos[] = [];

  totalVeiculos: number = 0;
  page: number = 1;

  @ViewChild('template') template: TemplateRef<any>;

  veiculoForm!: FormGroup;
  salvarButton: string = 'Salvar';

  tipoVeiculo: any = [ { id: 1, name: 'carro' }, { id: 2, name: 'Caminhão'}];
  selectedTipoVeiculo: number = 1;

  revision: boolean = false;
  veiculo_id: number = 0;

  constructor(
    private _tabelaVeiculoService: TabelaVeiculoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {

    this.veiculoForm = this.fb.group({
      id: [''],
      Placa: [''],
      Ano: ['', Validators.required],
      Cor: [''],
      Modelo: [''],
      revisoes: [''],
      CapacidadePassageiro: [''],
      CapacidadeCarga: [''],
      TipoVeiculo: ['']
    });

  }

  ngOnInit(): void {
    this.veiculos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal'] && this.showModal) {
      this.openModal();
    }
  }

  veiculos() {
    this._tabelaVeiculoService.veiculos().subscribe((response) => {
      console.log("veiculos", response);
      this.veiculosData = response.data;
      this.veiculosDataFiltered = response.data;
      this.totalVeiculos = this.veiculosData ? this.veiculosData.length : 0;
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

  salvarVeiculo() {

    console.log("veiculo_id", this.veiculo_id);

    this.veiculoForm.get('TipoVeiculo')?.setValue(this.selectedTipoVeiculo);

    if (this.selectedTipoVeiculo == 1) this.veiculoForm.get('CapacidadeCarga')?.setValue(null);
    else this.veiculoForm.get('CapacidadePassageiro')?.setValue(null);

    if (this.veiculoForm.valid) {
      if (this.veiculo_id == 0) {
        this._tabelaVeiculoService.salvarVeiculo(this.veiculoForm.value).subscribe((response) => {
          this.toastr.success('Veículo salvo com sucesso!');
          this.veiculoForm.reset();
          this.closeModal();
          this.veiculos();
        }, (error) => {
          this.toastr.error('Ocorreu um erro ao salvar o veículo.');
        });
      } else {
        this._tabelaVeiculoService.salvarEditarVeiculo(this.veiculo_id, this.veiculoForm.value).subscribe((response) => {
          this.toastr.success('Veículo editado com sucesso!');
          this.closeModal();
          this.veiculoForm.reset();
          this.veiculo_id = 0;
          this.veiculos();
        });
      }
    } else {
      this.toastr.error('Preencha todos os campos obrigatórios.');
    }
  }

  openRevision() {
    this.revision = !this.revision;
    console.log('Revision', this.revision);
  }

  pesquisaVeiculo(data: any) {
    let nome = data.target.value.toLowerCase();
    let pesquisa = this.veiculosData.filter((item) => {
      return item.modelo.toLowerCase().includes(nome) || item.placa.toLowerCase().includes(nome);
    });

    if (pesquisa.length != 0)
      this.veiculosDataFiltered = pesquisa;
    else
      this.veiculosDataFiltered = this.veiculosData;
  }

  editarVeiculo(veiculo_id: number) {
    this.veiculosData.forEach((veiculo) => {
      if (veiculo.id === veiculo_id) {
        this.veiculoForm.get('id')?.setValue(veiculo.id);
        this.veiculoForm.get('Modelo')?.setValue(veiculo.modelo);
        this.veiculoForm.get('Ano')?.setValue(veiculo.ano);
        this.veiculoForm.get('Placa')?.setValue(veiculo.placa);
        this.veiculoForm.get('Cor')?.setValue(veiculo.cor);
        if (veiculo?.carro) {
          this.selectedTipoVeiculo = 1;
          this.veiculoForm.get('CapacidadePassageiro')?.setValue(veiculo.carro.capacidadePassageiro);
          this.veiculo_id = veiculo.carro.veiculoId;
        }
        else {
          this.selectedTipoVeiculo = 2;
          this.veiculoForm.get('CapacidadeCarga')?.setValue(veiculo.caminhao.capacidadeCarga);
          this.veiculo_id = veiculo.caminhao.veiculoId;
        }

        this.openModal();
        this.salvarButton = 'Atualizar';
      }
    });
  }
}
