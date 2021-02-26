import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'formModal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public databaseService:DatabaseService, private dialogRef: MatDialogRef<FormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
  onSaveForm(){
    if(this.databaseService.selected.id == null){
        //new
        let newPacient ={
          Nombre: this.databaseService.selected.Nombre,
          Apellido: this.databaseService.selected.Apellido,
          telephone:this.databaseService.selected.telephone,
          email: this.databaseService.selected.email,
          age: this.databaseService.selected.age,
          comments: this.databaseService.selected.comments
        }
        console.log('NEW',newPacient);
        this.databaseService.addPacient(newPacient);
    }
    else{
      this.databaseService.editPacient(this.databaseService.selected);
    }
    this.close();
    
  }
  close(): void{
    this.dialogRef.close();
  }

}


