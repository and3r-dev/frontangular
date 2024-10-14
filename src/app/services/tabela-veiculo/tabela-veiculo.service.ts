import { Injectable, Input } from '@angular/core';
import { environment } from './../../utils/constants/envronment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabelaVeiculoService {
  private apiUrl: string = environment.baseUrl;
  @Input() showModal: boolean = false;

  constructor(private http: HttpClient) { }

  veiculos(): Observable<any> {
    return this.http.get(`${this.apiUrl}veiculos`);
  }

  openModal() {
    const modalElement = document.getElementById('veiculoModal');
    if (modalElement) {
      (modalElement as any).showModal();
    }
  }

  ngOnChanges() {
    if (this.showModal) {
      this.openModal();
    }
  }
}

