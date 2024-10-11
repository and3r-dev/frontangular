import { Injectable } from '@angular/core';
import { environment } from './../../utils/constants/envronment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabelaVeiculoService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  veiculos(): Observable<any> {
    return this.http.get(`${this.apiUrl}veiculos`);
  }
}

