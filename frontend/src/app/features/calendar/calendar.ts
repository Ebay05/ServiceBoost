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
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { isSameDay } from 'date-fns';
import { Subject } from 'rxjs';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Button } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { TitleCasePipe } from '@angular/common';

import { DateFormatter } from './date-formatter/date-formatter';
import { pl } from 'date-fns/locale';

registerLocaleData(localePl);

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
      useFactory: () => adapterFactory(),
    }),
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatter,
    },
  ],

  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class Calendar {
  readonly CalendarView = CalendarView;
  activeDayIsOpen = true;

  locale: string = 'pl';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  view: CalendarView = CalendarView.Month;
  viewDate = new Date();

  activeWeekday = (new Date().getDay() + 6) % 7;
  weekdays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
  formatDay(date: Date): string {
    return String(date.getDate()).padStart(2, '0');
  }

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
      client: 'Natalia Czerwińska',
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

  isCurrentMonth(): boolean {
    const today = new Date();
    return (
      this.viewDate.getFullYear() === today.getFullYear() &&
      this.viewDate.getMonth() === today.getMonth()
    );
  }

  refresh = new Subject<void>();

  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true,
  ) => {
    if (event.allDay) {
      return true;
    }

    if (!newStart || !newEnd) {
      return false;
    }

    delete event.cssClass;
    // don't allow dragging or resizing events to different days
    const sameDay = isSameDay(newStart, newEnd);

    if (!sameDay) {
      return false;
    }

    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      return (
        otherEvent !== event &&
        !otherEvent.allDay &&
        ((otherEvent.end && otherEvent.start < newStart && newStart < otherEvent.end) ||
          (newEnd && otherEvent.end && otherEvent.start < newEnd && newStart < otherEvent.end))
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }

    return true;
  };

  eventTimesChanged(eventTimesChangedEvent: CalendarEventTimesChangedEvent): void {
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      const { event, newStart, newEnd } = eventTimesChangedEvent;
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }
  }
}
