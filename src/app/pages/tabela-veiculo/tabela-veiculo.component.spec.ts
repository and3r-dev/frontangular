import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVeiculoComponent } from './tabela-veiculo.component';

describe('TabelaVeiculoComponent', () => {
  let component: TabelaVeiculoComponent;
  let fixture: ComponentFixture<TabelaVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaVeiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
