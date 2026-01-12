import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/membre';

@Injectable({
  providedIn: 'root'
})
export class MembreService {
 constructor(private httpClient:HttpClient) {
   }
  
  //CRUD sur les membres

  GetAllMembers() : Observable<any[]>
  {
    return this.httpClient.get<any[]> ("http://localhost:9000/MEMBRE-SERVICE/membres")
    //fil cas mt l spring boot just houni tbaddel l URL mt3 l spring boot
  }

 addEtudiant(m: any): Observable<void> {
  return this.httpClient.post<void>('http://localhost:9000/MEMBRE-SERVICE/membres/etudiants',m );
}

addEnseignant(m: any): Observable<void> {
  return this.httpClient.post<void>('http://localhost:9000/MEMBRE-SERVICE/membres/enseignants', m);
}


  DeleteMember(id:string) : Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:9000/MEMBRE-SERVICE/membres/${id}`); //Alt GR 7 
  }
  GetMemberById(id:string) : Observable<Member>{
    return this.httpClient.get<Member>(`http://localhost:9000/MEMBRE-SERVICE/membres/${id}`);
  }
updateEtudiant(id: number, data: any): Observable<any> {
  return this.httpClient.put(`http://localhost:9000/MEMBRE-SERVICE/membres/etudiants/${id}`, data);
}
 
updateEnseignant(id: number, data: any): Observable<any> {
  return this.httpClient.put(`http://localhost:9000/MEMBRE-SERVICE/membres/enseignants/${id}`, data);
}
getEncadrants(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:9000/MEMBRE-SERVICE/membres/enseignants`);
  }
}
