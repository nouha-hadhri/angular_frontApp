import { ChartConfiguration } from "chart.js";
import { MembreService } from "../services/membre.service";
import { OutilService } from "../services/outil.service";
import { EvenementService } from "../services/evenement.service";
import { PublicationService } from "../services/publication.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Stats Cards
  totalMembres = 0;
  totalOutils = 0;
  totalEvenements = 0;
  totalPublications = 0;

  // Charts
  membresChartData!: ChartConfiguration<'bar'>['data'];
  membresChartOptions!: ChartConfiguration<'bar'>['options'];

  outilsChartData!: ChartConfiguration<'pie'>['data'];
  outilsChartOptions!: ChartConfiguration<'pie'>['options'];

  evenementsChartData!: ChartConfiguration<'line'>['data'];
  evenementsChartOptions!: ChartConfiguration<'line'>['options'];

  publicationsChartData!: ChartConfiguration<'doughnut'>['data'];
  publicationsChartOptions!: ChartConfiguration<'doughnut'>['options'];

  // new UI state
  loading = false;
  errorMessage = '';

  // New charts
  membresAgeGroupsData!: ChartConfiguration<'pie'>['data'];
  membresAgeGroupsOptions!: ChartConfiguration<'pie'>['options'];

  outilsEtatData!: ChartConfiguration<'doughnut'>['data'];
  outilsEtatOptions!: ChartConfiguration<'doughnut'>['options'];

  combinedMonthlyData!: ChartConfiguration<'bar'>['data'];
  combinedMonthlyOptions!: ChartConfiguration<'bar'>['options'];

  constructor(
    private membreService: MembreService,
    private outilService: OutilService,
    private evenementService: EvenementService,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      membres: this.membreService.GetAllMembers().pipe(catchError(err => { this.errorMessage += 'Erreur chargement membres. '; return of([]); })),
      outils: this.outilService.GetAllOutils().pipe(catchError(err => { this.errorMessage += 'Erreur chargement outils. '; return of([]); })),
      events: this.evenementService.GetAllEvenements().pipe(catchError(err => { this.errorMessage += 'Erreur chargement événements. '; return of([]); })),
      pubs: this.publicationService.GetAllPublications().pipe(catchError(err => { this.errorMessage += 'Erreur chargement publications. '; return of([]); })),
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(({ membres, outils, events, pubs }: any) => {
      // Totals
      this.totalMembres = membres.length;
      this.totalOutils = outils.length;
      this.totalEvenements = events.length;
      this.totalPublications = pubs.length;

      // 1) Membres by month (existing chart) — keep first 6 months as example
      const memberMonthly = this.computeMonthlyCounts(membres, 'dateNaissance');
      this.membresChartData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû','Sep','Oct','Nov','Déc'],
        datasets: [{
          label: 'Nouveaux Membres',
          data: memberMonthly,
          backgroundColor: '#3f51b5',
          borderColor: '#3f51b5',
          borderWidth: 1
        }]
      };
      this.membresChartOptions = {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          title: { display: true, text: 'Nouveaux Membres par Mois' }
        },
        scales: { y: { beginAtZero: true } }
      };

      // 2) Outils distribution by type (existing)
      const types = ['Électrique', 'Manuel', 'Autre'];
      const typeCounts = types.map((t: string) => outils.filter((o: any) => o.type === t).length);
      this.outilsChartData = {
        labels: types,
        datasets: [{
          label: 'Distribution des Outils',
          data: typeCounts,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
          borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
          borderWidth: 1
        }]
      };
      this.outilsChartOptions = {
        responsive: true,
        plugins: { legend: { display: true, position: 'bottom' }, title: { display: true, text: 'Types d\'Outils' } }
      };

      // New: outils by état (Disponible / Affecté / Autre)
      const etats = ['Disponible', 'Affecté', 'Autre'];
      const etatCounts = etats.map(e => outils.filter((o: any) => {
        const et = (o.etat || '').toString();
        if (e === 'Autre') return et !== 'Disponible' && et !== 'Affecté';
        return et === e;
      }).length);
      this.outilsEtatData = {
        labels: etats,
        datasets: [{ data: etatCounts, backgroundColor: ['#4caf50','#f44336','#9e9e9e'] }]
      };
      this.outilsEtatOptions = { responsive: true, plugins: { title: { display: true, text: 'État des Outils' } } };

      // 3) Events per week (existing)
      const weeks = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
      const weekCounts = weeks.map((w, i) => events.filter((e: any) => e.semaine === i + 1).length);
      this.evenementsChartData = {
        labels: weeks,
        datasets: [{
          label: 'Événements',
          data: weekCounts,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      };

      // 4) Publications by category (existing)
      const categories = ['Actualité', 'Tutoriel', 'Annonce', 'Opinion'];
      const catCounts = categories.map(c => pubs.filter((p: any) => p.categorie === c).length);
      this.publicationsChartData = {
        labels: categories,
        datasets: [{
          label: 'Publications',
          data: catCounts,
          backgroundColor: ['#9c27b0', '#2196f3', '#ff9800', '#f44336'],
          borderColor: ['#9c27b0', '#2196f3', '#ff9800', '#f44336'],
          borderWidth: 1
        }]
      };

      // New: Membres age groups (pie)
      const ageGroups = { '<25': 0, '25-34': 0, '35-44': 0, '45+': 0 };
      membres.forEach((m: any) => {
        const age = this.getAge(m.dateNaissance);
        if (age < 25) ageGroups['<25']++;
        else if (age < 35) ageGroups['25-34']++;
        else if (age < 45) ageGroups['35-44']++;
        else ageGroups['45+']++;
      });
      this.membresAgeGroupsData = {
        labels: Object.keys(ageGroups),
        datasets: [{ data: Object.values(ageGroups), backgroundColor: ['#ff9f40','#36a2eb','#ff6384','#9c27b0'] }]
      };
      this.membresAgeGroupsOptions = { responsive: true, plugins: { title: { display: true, text: 'Répartition par Tranche d\'Âge' } } };

      // New: Combined monthly stacked chart (Members vs Publications)
      const pubMonthly = this.computeMonthlyCounts(pubs, 'datePublication');
      this.combinedMonthlyData = {
        labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
        datasets: [
          { label: 'Membres', data: memberMonthly, backgroundColor: '#3f51b5' },
          { label: 'Publications', data: pubMonthly, backgroundColor: '#2196f3' }
        ]
      };
      this.combinedMonthlyOptions = {
        responsive: true,
        plugins: { title: { display: true, text: 'Comparaison Mensuelle: Membres vs Publications' }, legend: { position: 'top' } },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      };

    }, () => {
      // subscribe error (shouldn't happen because we catchError inside streams),
      this.errorMessage += 'Erreur inconnue lors du chargement';
    });
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }

  // Helper: compute 12 months counts for items having a date field
  private computeMonthlyCounts(items: any[], dateField: string): number[] {
    const counts = new Array(12).fill(0);
    items.forEach(item => {
      const d = item && (item[dateField] || item.date) ? new Date(item[dateField] || item.date) : null;
      if (d && !isNaN(d.getTime())) counts[d.getMonth()]++;
    });
    return counts;
  }

  private getAge(dateStr: any): number {
    const d = dateStr ? new Date(dateStr) : null;
    if (!d || isNaN(d.getTime())) return 0;
    const diff = Date.now() - d.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

}
