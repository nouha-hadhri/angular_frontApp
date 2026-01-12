import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OutilService } from '../services/outil.service';

@Component({
  selector: 'app-outil',
  templateUrl: './outil.component.html',
  styleUrls: ['./outil.component.css']
})
export class OutilComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: any[] = [];

  constructor(private OS: OutilService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadOutils();
  }

  loadOutils(): void {
    this.OS.GetAllOutils().subscribe(data => {
      this.dataSource = data;
    });
  }

  deleteOutil(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.OS.DeleteOutil(id).subscribe(() => {
          this.loadOutils(); // recharge la liste après suppression
        });
      }
    });
  }
}
