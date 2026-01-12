import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OutilService } from '../services/outil.service';

@Component({
  selector: 'app-outil',
  templateUrl: './outil.component.html',
  styleUrls: ['./outil.component.css']
})
export class OutilComponent implements OnInit  {
   displayedColumns: string[] = ['id', 'date', 'source','actions'];
 
  constructor(private OS:OutilService,private dialog:MatDialog) { }
   dataSource:any[]= []
   deleteOutil(id:string){
  //ouvrir la boite de dialogue
   let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  height: '400px',
  width: '600px',
});
//2 attendre le resultat de user
    dialogRef.afterClosed().subscribe(result=>{
      //si l'utilisateur a confirme la suppression
      if(result===true){
        this.OS.DeleteOutil(id).subscribe(()=>{
          //apres la suppression on rafraichit la liste des outils
          this.OS.GetAllOutils().subscribe(data=>{
            this.dataSource=data;
           })
        })
      }
    })
   }
  //Invoquer le service
  //recuperer les donnees et l'enregistrer dans le tableau dataSource
  ngOnInit(): void {
   this.OS.GetAllOutils().subscribe(data=>{
    this.dataSource=data;
   })
  }
}
