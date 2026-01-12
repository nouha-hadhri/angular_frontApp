import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Statistiques
  nbMembers: number = 0;
  nbPublications: number = 0;
  nbTools: number = 0;
  nbEvents: number = 0;

  // Chart configurations
  membersChartConfig: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: ['Actifs', 'Inactifs'],
      datasets: [{ data: [70, 30], backgroundColor: ['#36A2EB', '#FF6384'] }]
    }
  };

  publicationsChartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Publications',
        data: [12, 19, 8, 15, 10, 14],
        backgroundColor: '#4BC0C0'
      }]
    }
  };

  eventsChartConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Événements',
        data: [5, 8, 6, 10, 7, 9],
        borderColor: '#FF9F40',
        fill: false
      }]
    }
  };

  toolsChartConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['Actifs', 'Archivés'],
      datasets: [{ data: [85, 15], backgroundColor: ['#9966FF', '#C9CBCF'] }]
    }
  };

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    // À remplacer par les appels à votre service
    this.nbMembers = 245;
    this.nbPublications = 87;
    this.nbTools = 34;
    this.nbEvents = 12;
  }
}
