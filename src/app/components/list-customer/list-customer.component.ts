import { Component, OnInit,ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource,} from '@angular/material/table';
import {CustomerI} from '../../models/customer.mode';
import { element } from 'protractor';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit  { 
  displayedColumns: string[] = ['Nombre','Apellido','telephone','email','age','comments', 'actions','new'];
  dataSource = new MatTableDataSource();
 

  constructor(private databaseService: DatabaseService,private dialog: MatDialog 
    
    ) { }

  ngOnInit(): void {    
    this.databaseService.getAllPacients().subscribe(res => this.dataSource.data = res);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(element :any){
    this.resetForm();
    this.openModal();
    if(element){
      this.databaseService.selected = element;
    }
    
  }
  DeletePatient(id: string){
    const confirmacion = confirm('Esta seguro de eliminar este paciente?')
    if(confirmacion){
      this.databaseService.deletePaciente(id);
    }    
  }

  openModal():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      title:'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormComponent, dialogConfig);
  }
  resetForm():void{
    this.databaseService.selected.Nombre='';
    this.databaseService.selected.Apellido='';
    this.databaseService.selected.telephone='';
    this.databaseService.selected.email='';
    this.databaseService.selected.age='';
    this.databaseService.selected.comments='';
    this.databaseService.selected.id=null;
  } 
  
}
