import { TestBed } from '@angular/core/testing';

import { TabelaVeiculoService } from './tabela-veiculo.service';

describe('TabelaVeiculoService', () => {
  let service: TabelaVeiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaVeiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
