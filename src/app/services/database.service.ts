import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { EventModel } from '../models/event.model';
import { CustomerI } from '../models/customer.mode';
import { NgForm } from '@angular/forms';


export interface CustomerId extends CustomerI{id: string; }

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  private eventos: AngularFirestoreCollection<EventModel>;
  private customerCollection : AngularFirestoreCollection<CustomerI>;
  customers:Observable<CustomerI[]>;

  public selected ={
    id:null,
    Nombre:'',
    Apellido:'',
    telephone:'',
    email:'',
    age:'',
    comments:'',
  }
  
  collection<T>(arg0: string): AngularFirestoreCollection<import("../models/event.model").EventModel> {
    throw new Error('Method not implemented.');

  }

  constructor(private database: AngularFirestore) {
    this.eventos = database.collection<EventModel>('events');
    
    this.customerCollection=database.collection<CustomerI>('customer');
    this.customers=this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const b = a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return {id , ...b};
      }))
    )

  }
  //get out buddy
  public setEvent(event: any): Promise<void> {
    if (!event.id) { event.id = this.getId(); }
    return this.database.collection('events').doc(event.id).set(event);
  }

  public getEvents(): Observable<any[]> {
    const eventsC: any[] = [];
    const registers: any[] = [];
    return this.database.collection('events').snapshotChanges().pipe(
      map((docs: any) => {
        docs.map((doc: any) => {
          const event = doc.payload.doc.data();
          const eventCalendar = {
            title: event.firstName,
            date: event.date + 'T' + event.time,
            id: event.id
          };
          eventsC.push(eventCalendar);
          registers.push(event);
        });
        console.log(registers);
        sessionStorage.setItem('events', JSON.stringify(registers));
        return eventsC;
      })
    );
  }

  public setUser(user: any): Promise<void> {
    return this.database.collection('users').doc(user.id).set(user);
  }

  public getUser(userId: string): Promise<any> {
    return this.database.collection('users').doc(userId).valueChanges().pipe(first()).toPromise();
  }

  private getId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  //,opo
  onDelete(id: string): Promise<void> {
    return new Promise(async (resolve, rejects)=> {
      try{
        const result = this.eventos.doc(id).delete();
        alert("CITA ELIMINADA CORRECTAMENTE");
      }catch(err) {
        rejects(err.message);
      }
    });
  }
  //PACIENTES
  getAllPacients(){
    return this.customers;
  }
  editPacient(customer: CustomerI){    
     return this.customerCollection.doc(customer.id).update(customer);
  }

  deletePaciente(id: string){
    return this.customerCollection.doc(id).delete();
  }
  addPacient(customer: CustomerI){
    return this.customerCollection.add(customer);
  } 


}

