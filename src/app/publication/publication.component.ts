import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit  {
   displayedColumns: string[] = ['id', 'type','titre','lien','createdAt','updatedAt','actions'];

  constructor(private PS:PublicationService,private dialog:MatDialog) { }
   dataSource:any[]= []
   deletePublication(id:string){
  //ouvrir la boite de dialogue
   let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  height: '400px',
  width: '600px',
});
//2 attendre le resultat de user
    dialogRef.afterClosed().subscribe(result=>{
      //si l'utilisateur a confirme la suppression
      if(result===true){
        this.PS.DeletePublication(id).subscribe(()=>{
          //apres la suppression on rafraichit la liste des publications
          this.PS.GetAllPublications().subscribe(data=>{
            this.dataSource=data;
           })
        })
      }
    })
   }
  //Invoquer le service
  //recuperer les donnees et l'enregistrer dans le tableau dataSource
  ngOnInit(): void {
   this.PS.GetAllPublications().subscribe(data=>{
    this.dataSource=data;
   })
  }
}

