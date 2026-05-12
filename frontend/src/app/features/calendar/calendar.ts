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
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePipe } from '@angular/common';
import dayjs from 'dayjs';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Button } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import { DateFormatter } from './date-formatter/date-formatter';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

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
    SelectButton,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    Button,
    CalendarDatePipe,
    DialogModule,
    InputText,
    DatePickerModule,
    SelectButtonModule,
    TextareaModule,
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

  // My events or from database
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

  // Creating events
  events: CalendarEvent[] = this.myEvents.map((e) => ({
    start: new Date(`${e.date}T${e.hour ?? '00:00'}`),
    title: e.description,
    meta: {
      client: e.client,
      type: e.type,
      vehicle: e.vehicle,
      hour: e.hour,
      age: e.age,
    },
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

  isCurrentWeek(): boolean {
    const today = new Date();
    const view = new Date(this.viewDate);

    const getMonday = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = (day === 0 ? -6 : 1) - day;
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const mondayToday = getMonday(today);
    const mondayView = getMonday(view);

    return mondayToday.getTime() === mondayView.getTime();
  }

  // Week View Header

  getWeekDays(): { name: string; date: Date }[] {
    const start = new Date(this.viewDate);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // poniedziałek jako start
    start.setDate(start.getDate() + diff);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        name: this.weekdays[i],
        date: d,
      };
    });
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
    const sameDay = isSameDay(newStart, newEnd);

    if (!sameDay) {
      return false;
    }

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

  // Adding order form

  visible = false;

  showDialog() {
    this.visible = true;
  }

  optionsClient = [
    { label: 'Nowy', value: 0 },
    { label: 'Z bazy', value: 1 },
  ];

  // Adding order data
  valueClient = 0;
  valueVehicle = 0;
  note!: string;

  today = new Date();
  date_of_admission = this.today;

  deadline: Date | undefined;
}
