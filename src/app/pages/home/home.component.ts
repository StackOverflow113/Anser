import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { DialogEventComponent } from '../../components/dialog-event/dialog-event.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    locale: 'es',
    height: 600,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [     
    ],
    eventClick: this.showEvent.bind(this)
  };
  ready = false;

  constructor(public dialog: MatDialog, private database: DatabaseService) {
    this.database.getEvents().subscribe((events: any) => {
      console.log(events);
      this.calendarOptions.events = events;
      this.ready = true;
    });
  }

  ngOnInit(): void {
  }

  handleDateClick(arg: any): void {
    this.openDialog({date: arg.dateStr });
    console.log(arg);
  }

  showEvent(arg: any): void {
    this.openDialog({id: arg.event.id });
  }

  public openDialog(event: any): void {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '800px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
