import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
 constructor(private httpClient:HttpClient) {
   }

  //CRUD sur les evenements
  GetAllEvenements() : Observable<any[]>
  {
    return this.httpClient.get<any[]> ("http://localhost:9000/EVENEMENT-SERVICE/evenements")
    //fil cas mt l spring boot just houni tbaddel l URL mt3 l spring boot
  }

 addEvenement(m: any): Observable<void> {
  return this.httpClient.post<void>('http://localhost:9000/EVENEMENT-SERVICE/evenements',m );
}

  DeleteEvenement(id:string) : Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:9000/EVENEMENT-SERVICE/evenements/${id}`); //Alt GR 7 
  }
  GetEvenementById(id:string) : Observable<Evenement>{
    return this.httpClient.get<Evenement>(`http://localhost:9000/EVENEMENT-SERVICE/evenements/${id}`);
  }
 updateEvenement(id: number, data: any): Observable<any> {
  return this.httpClient.put(`http://localhost:9000/EVENEMENT-SERVICE/evenements/${id}`, data);
}
}
