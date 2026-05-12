import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface Employee {
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-list',
  imports: [Button, Dialog, FloatLabel, DatePicker, FormsModule, SelectModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  // Adding order form

  visible = false;

  showDialog() {
    this.visible = true;
  }

  optionsClient = [
    { label: 'Nowy', value: 0 },
    { label: 'Z bazy', value: 1 },
  ];

  today = new Date();
  creation_date = this.today;

  employees: Employee[] = [];
  selectedEmployee: Employee | undefined;

  ngOnInit() {
    this.employees = [
      { firstname: 'Marian', lastname: 'Paździoch' },
      { firstname: 'Rome', lastname: 'RM' },
      { firstname: 'London', lastname: 'LDN' },
      { firstname: 'Istanbul', lastname: 'IST' },
      { firstname: 'Paris', lastname: 'PRS' },
    ];
  }
}
