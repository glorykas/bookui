/*
 * Copyright (c) 2018.
 * Author: NicoleJestine.
 * Last Modified: 2018/10/08 15:25 PM
 */

import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../domain/book';
import {timeout} from 'rxjs/operators';
import {AppUtil} from '../../../../conf/app-util';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private bookUrl = SERVICE_BASE_URL + 'books/site/';
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('BookService');
  }

  /**
   * Get Books
   */
  getBooks(siteId: String): Observable<Book[]> {
    const url = this.bookUrl + 'getall/' + siteId;
    return this.http.get<Book[]>(url).pipe(
      timeout( 10000),
    );
}

  /**
   * Create/Add Book
   */
  addBook(book: Book): Observable<Book> {
    const url = this.bookUrl + 'book/create';
    return this.http.post<Book>(url, book, AppUtil.getHttpHeaders()).pipe();
  }

  /**
   * Delete Books
   */
  deleteBook(book: Book): Observable<Book> {
    const url = this.bookUrl + 'book/delete';
    return this.http.post<Book>(url, book, AppUtil.getHttpHeaders()).pipe();
  }

  /**
   * Update a book
   */
  updateBook (book: Book): Observable<Book> {
    const url = this.bookUrl + 'book/update';
    return this.http.post<Book>(url, book, AppUtil.getHttpHeaders()).pipe(
      timeout(10000));
  }

}
