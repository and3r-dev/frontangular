export interface Veiculos {
  id: number;
  placa: string;
  ano: number;
  cor: string;
  modelo: string;
  revisoes: string;
  CapacidadeCarga: number;
  CapacidadePassageiro: number;
  carro: Carro;
  caminhao: Caminhao;
}

export interface Carro {
  id: number;
  capacidadePassageiro: number;
  veiculoId: number;
}

export interface Caminhao {
  id: number;
  capacidadeCarga: number;
  veiculoId: number;
}
