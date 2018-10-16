import {Component, OnInit} from '@angular/core';
import {DataTransferService} from '../../shared/service/data-transfer.service';
import {Book} from '../../pages/bookui-admin/book-management/domain/book';
import {ToasterUtils} from '../../conf/util';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AppUtil} from '../../conf/app-util';

import 'style-loader!angular2-toaster/toaster.css';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from '../../pages/bookui-admin/book-management/service/section.service';
import {ChapterService} from '../../pages/bookui-admin/book-management/service/chapter.service';
import {Section} from '../../pages/bookui-admin/book-management/domain/section';

@Component({
  selector: 'ngx-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  loading: boolean;
  book: Book;
  toasterConfig: ToasterConfig;
  static toasterService: ToasterService;
  story: string;
  sections: Section[];

  constructor(private dataTransferService: DataTransferService,
              toasterService: ToasterService,
              private activatedRouterService: ActivatedRoute,
              private sectionService: SectionService,
              private chapterService: ChapterService,
  ) {
    BookComponent.toasterService = toasterService;
  }

  ngOnInit() {
    this.toasterConfig = ToasterUtils.TOASTER_CONFIG;
    this.dataTransferService.currentBook.subscribe(book => this.book = book);
    // this.activatedRouterService.data.subscribe( data => {
    //   switch (data.domain) {
    //     default: console.log(data);
    //   }
    // });
    this.processView();
  }

  private processView() {
    this.activatedRouterService.params.subscribe(params => {
      console.log(params);
      switch (params.domain) {
        case 'chapter': {
          this.getChapter(params.id);
          break;
        }
        default: {
          this.story = this.book.story;
          this.sections = null;
          // this.getSectionsInChapter(params.id);
        }
      }
    });
  }

  private getChapter(chapterId: string): void {
    this.loading = true;
    this.chapterService.getChapter(chapterId).subscribe(chapter => {
        if (chapter) {
          this.story = chapter.story;
        } else {
          BookComponent.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book Read - Chapter', 'Could not get chapter details');
        }
      },
      error => {
        this.loading = false;
        BookComponent.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book Read - Chapter', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
        this.getSectionsInChapter(chapterId);
      });
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  static showInformation(type: string, title: string, info: string): void {
    // BookComponent.tc = ToasterUtils.TOASTER_CONFIG;
    const toast: Toast = AppUtil.makeToast(type, title, info);
    BookComponent.toasterService.popAsync(toast);
  }

  private getSectionsInChapter(chapterId: string) {
    this.loading = true;
    this.sections = [];
    this.sectionService.getSectionsInChapter(chapterId).subscribe(sections => {
        if (sections) {
          this.sections = sections;
        } else {
          BookComponent.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book Read - Sections', 'Could not get sections');
        }
      },
      error => {
        this.loading = false;
        BookComponent.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book Read - Sections', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

}
