import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OutilService } from '../services/outil.service';
import { PublicationService } from '../services/publication.service';
import { EvenementService } from '../services/evenement.service';
import { MembreService } from '../services/membre.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-affecter-dialog',
  templateUrl: './affecter-dialog.component.html',
  styleUrls: ['./affecter-dialog.component.css']
})
export class AffecterDialogComponent implements OnInit {
items: any[] = [];
  selectedIds: number[] = [];
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'outil' | 'publication' | 'evenement',
      memberId: number
    },
    private outilService: OutilService,
    private pubService: PublicationService,
    private evtService: EvenementService,
    private memberService: MembreService,
    private dialogRef: MatDialogRef<AffecterDialogComponent>
  ) {}

  ngOnInit() {
    if (this.data.type === 'outil') {
      this.outilService.GetAllOutils().subscribe(res => this.items = res);
    }
    if (this.data.type === 'publication') {
      this.pubService.GetAllPublications().subscribe(res => this.items = res);
    }
    if (this.data.type === 'evenement') {
      this.evtService.GetAllEvenements().subscribe(res => this.items = res);
    }
  }

  toggle(id: number) {
    this.selectedIds.includes(id)
      ? this.selectedIds = this.selectedIds.filter(x => x !== id)
      : this.selectedIds.push(id);
  }

  valider() {
    if (this.selectedIds.length === 0) {
      this.dialogRef.close(false);
      return;
    }

    this.isLoading = true;

    // Créer un tableau d'observables
    const requests = this.selectedIds.map(id => {
      if (this.data.type === 'outil') {
        return this.memberService.affecterOutil(this.data.memberId, id);
      }
      if (this.data.type === 'publication') {
        return this.memberService.affecterPublication(this.data.memberId, id);
      }
      if (this.data.type === 'evenement') {
        return this.memberService.affecterEvenement(this.data.memberId, id);
      }
      return null;
    }).filter(req => req !== null);

    // Attendre que toutes les requêtes se terminent
    forkJoin(requests).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de l\'affectation:', err);
        this.isLoading = false;
        alert('Erreur lors de l\'affectation');
      }
    });
  }
}
