import { Component } from '@angular/core';
import {
  DateAdapter,
  provideCalendar,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarEvent,
  CalendarView,
  CalendarDatePipe,
  CalendarModule,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Button } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

interface Event {
  date: string;
  description: string;
  hour?: string;
  client?: string;
  vehicle?: string;
  type: string;
  age?: number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    SelectButtonModule,
    FormsModule,
    CalendarModule,
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    Button,
    CalendarDatePipe,
  ],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class Calendar {
  readonly CalendarView = CalendarView;
  activeDayIsOpen = true;

  view: CalendarView = CalendarView.Month;
  viewDate = new Date();

  myEvents: Event[] = [
    {
      date: '2026-05-01',
      description: 'Wizyta klienta',
      hour: '10:30',
      client: 'Beata Skalska',
      vehicle: 'Mazda RX60',
      type: 'work',
    },
    {
      date: '2026-05-05',
      client: 'Michał Wawel',
      description: 'Serwis auta',
      vehicle: 'Audi A8',
      hour: '14:00',
      type: 'work',
    },
    {
      date: '2026-05-05',
      client: ' Natalia Czerwińska',
      vehicle: 'Tiroc 200',
      description: 'Serwis auta',
      hour: '12:00',
      type: 'work',
    },
    {
      date: '2026-05-06',
      client: 'Adrian Górski',
      description: 'Serwis auta',
      vehicle: 'Subaru TR',
      hour: '16:00',
      type: 'work',
    },
    {
      date: '2026-05-06',
      description: 'Urodziny Damiana',
      age: 43,
      type: 'birthday',
    },
  ];

  events: CalendarEvent[] = this.myEvents.map((e) => ({
    start: new Date(`${e.date}T${e.hour ?? '00:00'}`),
    title: e.description,
  }));

  viewOptions = [
    { label: 'Miesiąc', value: CalendarView.Month },
    { label: 'Tydzień', value: CalendarView.Week },
    { label: 'Dzień', value: CalendarView.Day },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
