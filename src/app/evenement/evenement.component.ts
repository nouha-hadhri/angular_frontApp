import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titre', 'date','lieu','actions'];
   
    constructor(private ES:EvenementService,private dialog:MatDialog) { }
     dataSource:any[]= []
     deleteEvenement(id:string){
    //ouvrir la boite de dialogue
     let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '400px',
    width: '600px',
  });
  //2 attendre le resultat de user
      dialogRef.afterClosed().subscribe(result=>{
        //si l'utilisateur a confirme la suppression
        if(result===true){
          this.ES.DeleteEvenement(id).subscribe(()=>{
            //apres la suppression on rafraichit la liste des evenements
            this.ES.GetAllEvenements().subscribe(data=>{
              this.dataSource=data;
             })
          })
        }
      })
     }
    //Invoquer le service
    //recuperer les donnees et l'enregistrer dans le tableau dataSource
    ngOnInit(): void {
     this.ES.GetAllEvenements().subscribe(data=>{
      this.dataSource=data;
     })
    }

}
