import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {SubSection} from '../domain/sub-section';
import {Observable} from 'rxjs';
import {AppUtil} from '../../../../conf/app-util';
import {catchError, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubsectionsService {
  subsectionUrl = SERVICE_BASE_URL + 'books/site/';
  private handleError: HandleError;
  constructor(private http: HttpClient,
              httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('SubsectionService');
  }

  /**
   * Add Subsections
   */
  addSubSection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'subsection/create';
    // const body = JSON.stingify(chapter);
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders())
      .pipe( timeout(10000),
        // catchError(this.handleError('addSubsection, subsection')),
      );
  }
  /**
   * Get Subsections
   */
  getSubection(sectionId: string): Observable<SubSection[]> {
    const url = this.subsectionUrl + 'subsection/getall/' + sectionId;
    console.log(url);
    return this.http.get<SubSection[]>(url).pipe(
      timeout(10000),
      // catchError(this.handleError('getSubsection', [])),
    );
  }

  /**
   * delete Subsections
   */
  deleteSubSection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'subsection/delete';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
      // catchError(this.handleError('deleteSubsection', subsection)),
    );
  }

  /**
   * update chapter
   */
  updateSubSection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionUrl + 'subsection/update';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
      // catchError(this.handleError('updateSubsection', subsection)),
    );
  }
}



