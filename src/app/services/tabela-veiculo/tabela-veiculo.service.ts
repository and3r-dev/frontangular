import { Injectable, Input } from '@angular/core';
import { environment } from './../../utils/constants/envronment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculos } from '../../models/veiculos';

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

  salvarVeiculo(data: Veiculos): Observable<Veiculos> {
    return this.http.post<Veiculos>(`${this.apiUrl}veiculos`, data);
  }

  salvarEditarVeiculo(id:number, data: Veiculos): Observable<Veiculos> {
    return this.http.put<Veiculos>(`${this.apiUrl}veiculos/${id}`, data);
  }
}

