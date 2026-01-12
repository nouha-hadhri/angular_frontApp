import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Outil } from '../models/outil';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
 constructor(private httpClient:HttpClient) {
   }
  
  //CRUD sur les outils

  GetAllOutils() : Observable<any[]>
  {
    return this.httpClient.get<any[]> ("http://localhost:9000/OUTIL-SERVICE/outils")
    //fil cas mt l spring boot just houni tbaddel l URL mt3 l spring boot
  }

 addOutil(m: any): Observable<void> {
  return this.httpClient.post<void>('http://localhost:9000/OUTIL-SERVICE/outils',m );
}

  DeleteOutil(id:string) : Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:9000/OUTIL-SERVICE/outils/${id}`); //Alt GR 7 
  }
  GetOutilById(id:string) : Observable<Outil>{
    return this.httpClient.get<Outil>(`http://localhost:9000/OUTIL-SERVICE/outils/${id}`);
  }
 updateOutil(id: number, data: any): Observable<any> {
  return this.httpClient.put(`http://localhost:9000/OUTIL-SERVICE/outils/${id}`, data);
}

}
