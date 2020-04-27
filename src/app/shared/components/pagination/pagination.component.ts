import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() calculate = false;
  @Input() offset = 0;
  @Input() limit = 1;
  @Input() size = 1;
  @Input() range = 3;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<number[]>;
  currentPage: number;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  getPages(offset: number, limit: number, size: number) {
    // this.currentPage = this.getCurrentPage(offset, limit);
    this.currentPage = offset;
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = range(-this.range, this.range * 2 + 1).pipe(
      map(_offset => this.currentPage + _offset),
      filter(page => this.isValidPageNumber(Number(page), this.totalPages)),
      toArray()
    );
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  // getCurrentPage(offset: number, limit: number): number {
  //   return Math.floor(offset / limit) + 1;
  // }

  getTotalPages(limit: number, size: number): number {
    if (this.calculate) {
      return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
    } else {
      return size;
    }
  }

  selectPage(page: number, event, _dislableAction: boolean) {
    if (!_dislableAction) {
      event.preventDefault();
      if (this.isValidPageNumber(page, this.totalPages)) {
        this.pageChange.emit((page - 1) * this.limit);
      }
    }
  }


}
