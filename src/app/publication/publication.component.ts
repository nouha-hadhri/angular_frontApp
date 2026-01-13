import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'type', 'titre', 'sourcePDF', 'lien', 'createdAt', 'updatedAt', 'actions'];
  displayedColumnsFiltered: string[] = [...this.displayedColumns];
  dataSource: any[] = [];

  @ViewChildren(CdkColumnDef) columnDefs!: QueryList<CdkColumnDef>;

  constructor(private PS: PublicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  ngAfterViewInit(): void {
    const updateFiltered = () => {
      const defined = this.columnDefs.map(cd => cd.name);
      this.displayedColumnsFiltered = this.displayedColumns.filter(c => defined.includes(c));
    };
    updateFiltered();
    this.columnDefs.changes.subscribe(updateFiltered);
  }

  loadPublications(): void {
    this.PS.GetAllPublications().subscribe(data => {
      this.dataSource = data;
      // ensure filtered columns up-to-date in case data/template changed
      if (this.columnDefs) {
        const defined = this.columnDefs.map(cd => cd.name);
        this.displayedColumnsFiltered = this.displayedColumns.filter(c => defined.includes(c));
      }
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
