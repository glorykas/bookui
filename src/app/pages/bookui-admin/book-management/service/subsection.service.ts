import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {SubSection} from '../domain/sub-section';
import {Observable} from 'rxjs';
import {AppUtil} from '../../../../conf/app-util';
import {catchError, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubsectionService {
  subsectionUrl = SERVICE_BASE_URL + 'subsections/';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('SubsectionService');
  }

  /**
   * add subsection
   */
  addSubsection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'create';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders())
      .pipe();
  }

  /**
   * get subsection
   */
  getSubsections(): Observable<SubSection[]> {
    const url = this.subsectionUrl + 'getall';
    return this.http.get<SubSection[]>(url).pipe(
      timeout(10000),
    );
  }

  /**
   * delete subsection
   */
  deleteSubsection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'delete';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe();
  }

  /**
   * update subsection
   */
  updateSubsection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'update';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }
}
