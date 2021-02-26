import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventModel } from '../../models/event.model';
import { Observable } from 'rxjs';
import{AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.css']
})
export class DialogEventComponent implements OnInit {

  event = {} as EventModel;
  isNewEvent = false; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
              private database: DatabaseService, private snackBar: MatSnackBar,
              ) {
    console.log(data);
    if (data.id) {
      if (sessionStorage.getItem('events')) {
        const events = JSON.parse(sessionStorage.events);
        const eventFound = events.find((e: EventModel) => e.id === data.id);
        this.event = eventFound;
      }
    } else {
      this.event.date = data.date;
      this.isNewEvent = true;
    }    
  }

  ngOnInit(): void {
   
  }

  public onSubmit(form: NgForm): void {
    if (!this.event.time) { this.openSnackBar('La hora es importante', 'OK'); return; }
    if (form.invalid) {
      this.openSnackBar('Llena todos los campos', 'OK');
      return;
    }

    this.event.firstName = this.event.firstName.trim();
    this.event.lastName = this.event.lastName.trim();
    this.event.telephone = this.event.telephone.trim();       
    if (this.event.email) {
      this.event.email = this.event.email.trim();
    }
    if (this.event.comments) {
      this.event.comments = this.event.comments.trim();
    }

    console.log(this.event);

    this.database.setEvent(this.event).then(() => {
      this.dialog.closeAll();
      this.openSnackBar('El registro se ha guardado', 'OK');
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  } 

  
   async onDelete(id: any): Promise<void> {
     const confirmacion = confirm('Esta seguro de eliminar este paciente?')
     if(confirmacion){
     try {
       await this.database.onDelete(id);        
       } catch (err) {
         console.log(err);
       }
     }
   }  
 

    
   
}

