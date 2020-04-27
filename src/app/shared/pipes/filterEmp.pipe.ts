import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../my-interfaces';

@Pipe({ name: 'empFilter' })
export class EmpFilterPipe implements PipeTransform {
  transform(employees: IEmployee[], nameToFilter: string): IEmployee[] {
    if (!employees) {
      return employees;
    }

    if (!nameToFilter) {
      return employees;
    }

    nameToFilter = nameToFilter.toLocaleLowerCase();
    return employees.filter(x => x.EmployeeName.toLowerCase().includes(nameToFilter) || x.Email.toLowerCase().includes(nameToFilter));
  }
}


// <li *ngFor="let c of employees | empFilter : fitlerText">
//     {{c}}
//   </li>
