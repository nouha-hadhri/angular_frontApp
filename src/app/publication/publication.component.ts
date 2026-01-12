import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any[] = [];

  constructor(private PS: PublicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.PS.GetAllPublications().subscribe(data => {
      this.dataSource = data;
    });
  }

  deletePublication(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.PS.DeletePublication(id).subscribe(() => {
          this.loadPublications();
        });
      }
    });
  }
}
