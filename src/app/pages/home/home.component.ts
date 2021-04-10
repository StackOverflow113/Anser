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

  constructor(public dialog: MatDialog, private database: DatabaseService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents(): void {
    this.database.getEvents().then((events: any) => {
      this.calendarOptions.events = this.init(events);
      this.ready = true;
    });
  }

  private init(documents: any) {
    const calendarEvents: any[] = [];
    const registers: any[] = [];
    for (const doc of documents) {
      const event = doc;
      const eventCalendar = {
        title: event.firstName + " " + event.lastName,
        date: event.date + 'T' + event.time,
        id: event.id
      };
      calendarEvents.push(eventCalendar);
      registers.push(event);
      sessionStorage.setItem('events', JSON.stringify(registers));
    }
    return calendarEvents;
  }
  handleDateClick(arg: any): void {
    this.openDialog({ date: arg.dateStr });
    console.log(arg);
  }

  showEvent(arg: any): void {
    this.openDialog({ id: arg.event.id });
  }

  public openDialog(event: any): void {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '800px',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEvents();
    });
  }
}
