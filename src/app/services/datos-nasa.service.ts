import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatosNasaService {

  constructor(public http: HttpClient) { }
  getData(): Observable<{ latitude: number; longitude: number; co2Concentration: number }[]> {
    return this.http.get<{ latitude: number; longitude: number; co2Concentration: number }[]>('http://localhost:3000');
  }
}
