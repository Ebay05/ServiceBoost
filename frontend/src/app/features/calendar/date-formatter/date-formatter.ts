import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-formatter',
  imports: [],
  templateUrl: './date-formatter.html',
  styleUrl: './date-formatter.scss',
})
export class DateFormatter extends CalendarDateFormatter {
  override weekViewHour({ date }: DateFormatterParams): string {
    return format(date, 'HH:mm', { locale: pl });
  }

  override dayViewHour({ date }: DateFormatterParams): string {
    return format(date, 'HH:mm', { locale: pl });
  }

  override monthViewColumnHeader({ date }: DateFormatterParams): string {
    return format(date, 'EEEE', { locale: pl });
  }

  override weekViewColumnHeader({ date }: DateFormatterParams): string {
    return format(date, 'EEEE', { locale: pl });
  }

  override weekViewColumnSubHeader({ date }: DateFormatterParams): string {
    return format(date, 'd MMM', { locale: pl });
  }
}
