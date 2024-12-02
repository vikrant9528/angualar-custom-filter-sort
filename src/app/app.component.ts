import { Conditional } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

interface Person {
  name: string;
  age: number;
  city: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'filter-sort';

  data: Person[] = [
    { name: 'arsh', age: 23, city: 'ghaziabad' },
    { name: 'vikrant', age: 24, city: 'muradnagar' },
    { name: 'aman', age: 35, city: 'mererut' },
    { name: 'karan', age: 26, city: 'delhi' },
  ];

  sortedData: Person[] = [...this.data];

  // filteredData: Person[] = [...this.data];

  sortDirection = 'asc';

  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void { }

  dataSort(data: any[], column: keyof Person, direction: string): any[] {
    const n = data.length;
    let sortedArray = [...data];
    console.log(n);
    console.log(column);

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        const a = sortedArray[j];
        const b = sortedArray[j + 1];

        let comparison = 0;

        if (typeof a[column] === 'string' && typeof b[column] === 'string') {
          comparison = a[column].localeCompare(b[column]);
        } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
          comparison = a[column] - b[column];
        }

        if (direction === 'desc') {
          comparison = -comparison;
        }
        if (comparison > 0) {
          [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
        }
      }
    }

    return sortedArray;
  }


  sortData(column: keyof Person): void {
    console.log(column);
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.sortedData = this.dataSort(this.data, column, this.sortDirection);
  }

  filterData(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.sortedData = this.data.filter((person) =>
      (person.name && person.name.toLowerCase().includes(searchTermLower)) ||
      (person.city && person.city.toLowerCase().includes(searchTermLower)) ||
      (person.age && person.age.toString().includes(searchTermLower))
    );
  }
}


