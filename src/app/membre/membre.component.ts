import { Component, OnInit } from '@angular/core';
import { MembreService } from '../services/membre.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit  {
   displayedColumns: string[] = ['id', 'cin', 'nom','prenom','type', 'dateNaissance', 'photo', 'email','cv', 'actions'];
 
  constructor(private MS:MembreService,private dialog:MatDialog) { }
   dataSource:any[]= []
   deleteMember(id:string){
  //ouvrir la boite de dialogue
   let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  height: '400px',
  width: '600px',
});
//2 attendre le resultat de user
    dialogRef.afterClosed().subscribe(result=>{
      //si l'utilisateur a confirme la suppression
      if(result===true){
        this.MS.DeleteMember(id).subscribe(()=>{
          //apres la suppression on rafraichit la liste des membres
          this.MS.GetAllMembers().subscribe(data=>{
            this.dataSource=data;
           })
        })
      }
    })
   }
  //Invoquer le service
  //recuperer les donnees et l'enregistrer dans le tableau dataSource
  ngOnInit(): void {
   this.MS.GetAllMembers().subscribe(data=>{
    this.dataSource=data;
   })
  }
}
