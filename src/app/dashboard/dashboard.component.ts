import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Stats Cards
  totalMembres: number = 45;
  totalOutils: number = 28;
  totalEvenements: number = 12;
  totalPublications: number = 67;

  // Charts
  membresChartData!: ChartConfiguration<'bar'>['data'];
  membresChartOptions!: ChartConfiguration<'bar'>['options'];

  outilsChartData!: ChartConfiguration<'pie'>['data'];
  outilsChartOptions!: ChartConfiguration<'pie'>['options'];

  evenementsChartData!: ChartConfiguration<'line'>['data'];
  evenementsChartOptions!: ChartConfiguration<'line'>['options'];

  publicationsChartData!: ChartConfiguration<'doughnut'>['data'];
  publicationsChartOptions!: ChartConfiguration<'doughnut'>['options'];

  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Membres Chart - Bar Chart
    this.membresChartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Nouveaux Membres',
          data: [5, 8, 12, 7, 10, 15],
          backgroundColor: '#3f51b5',
          borderColor: '#3f51b5',
          borderWidth: 1
        }
      ]
    };

    this.membresChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Évolution des Membres'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Outils Chart - Pie Chart
    this.outilsChartData = {
      labels: ['Électrique', 'Manuel', 'Autre'],
      datasets: [
        {
          label: 'Distribution des Outils',
          data: [12, 10, 6],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
          borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
          borderWidth: 1
        }
      ]
    };

    this.outilsChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Types d\'Outils'
        }
      }
    };

    // Événements Chart - Line Chart
    this.evenementsChartData = {
      labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
      datasets: [
        {
          label: 'Événements',
          data: [3, 5, 4, 8],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };

    this.evenementsChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Événements par Semaine'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Publications Chart - Doughnut Chart
    this.publicationsChartData = {
      labels: ['Actualité', 'Tutoriel', 'Annonce', 'Opinion'],
      datasets: [
        {
          label: 'Publications',
          data: [20, 25, 15, 7],
          backgroundColor: ['#9c27b0', '#2196f3', '#ff9800', '#f44336'],
          borderColor: ['#9c27b0', '#2196f3', '#ff9800', '#f44336'],
          borderWidth: 1
        }
      ]
    };

    this.publicationsChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Catégories de Publications'
        }
      }
    };
  }

  // Refresh data (pour appels API futurs)
  refreshDashboard(): void {
    console.log('Rafraîchissement du dashboard...');
    this.initializeCharts();
  }
}
