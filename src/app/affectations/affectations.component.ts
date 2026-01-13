import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MembreService } from '../services/membre.service';
import { OutilService } from '../services/outil.service';
import { EvenementService } from '../services/evenement.service';
import { PublicationService } from '../services/publication.service';
import { HttpClient } from '@angular/common/http';
interface Membre {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  pubs: any[];     // Publications associées
  events: any[];   // Événements associés
  outils: any[];   // Outils associés
}
@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.css']
})
export class AffectationsComponent implements OnInit {
  displayedColumns = ['cin','nom','prenom','outils','events','pubs'];


  membres: Membre[] = [];
  

  constructor(private M: MembreService) {}

  ngOnInit(): void {
    this.loadMembres();
  }

  loadMembres(): void {
  this.M.GetAllMembersWithDetails().subscribe(data => {
    this.membres = data.map((m: any) => ({
      ...m,
      outils: m.outils ?? [],
      publications: m.pubs ?? [],
      evenements: m.events ?? []
    }));
  });
}

   getOutilsNames(e: any): string {
  if (!e?.outils || e.outils.length === 0) {
    return '—';
  }
  return e.outils.map((o: any) => o.source ?? o).join(', ');
}

getEventsNames(e: any): string {
  if (!e?.events || e.events.length === 0) {
    return '—';
  }
  return e.events.map((ev: any) => ev.titre ?? ev).join(', ');
}

getPubsNames(e: any): string {
  if (!e?.pubs || e.pubs.length === 0) {
    return '—';
  }
  return e.pubs.map((p: any) => p.titre ?? p).join(', ');
}


  // Méthode pour rafraîchir
  refresh(): void {
    this.loadMembres();
  }
}
