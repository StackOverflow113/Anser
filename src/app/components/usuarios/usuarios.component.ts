import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource,} from '@angular/material/table';
import {CustomerI} from '../../models/customer.mode';
import { element } from 'protractor';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import{Users} from '../../models/usuarios.model'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
  
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Rol', 'Correo'];
  dataSource = new MatTableDataSource();


  constructor(public databaseService:DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getAllUsers().subscribe(res => this.dataSource.data = res);
  }

}
