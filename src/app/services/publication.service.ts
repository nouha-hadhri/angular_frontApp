import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
 constructor(private httpClient:HttpClient) {
   }

  //CRUD sur les publications
  GetAllPublications() : Observable<any[]>
  {
    return this.httpClient.get<any[]> ("http://localhost:9000/PUBLICATION-SERVICE/publications")
    //fil cas mt l spring boot just houni tbaddel l URL mt3 l spring boot
  }

 addPublication(m: any): Observable<void> {
  return this.httpClient.post<void>('http://localhost:9000/PUBLICATION-SERVICE/publications',m );
}

  DeletePublication(id:string) : Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:9000/PUBLICATION-SERVICE/publications/${id}`); //Alt GR 7 
  }
  GetPublicationById(id:number) : Observable<Publication>{
    return this.httpClient.get<Publication>(`http://localhost:9000/PUBLICATION-SERVICE/publications/${id}`);
  }
 updatePublication(id: number, data: any): Observable<any> {
  return this.httpClient.put(`http://localhost:9000/PUBLICATION-SERVICE/publications/${id}`, data);
}
getAuteurs(): Observable<any[]> {
  return this.httpClient.get<any[]>('http://localhost:9000/MEMBRE-SERVICE/membres');
}
}
