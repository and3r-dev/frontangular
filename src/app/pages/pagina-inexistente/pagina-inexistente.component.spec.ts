import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInexistenteComponent } from './pagina-inexistente.component';

describe('PaginaInexistenteComponent', () => {
  let component: PaginaInexistenteComponent;
  let fixture: ComponentFixture<PaginaInexistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaInexistenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaInexistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
