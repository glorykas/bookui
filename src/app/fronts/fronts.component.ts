import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './fronts-menu';
import {Book} from '../pages/bookui-admin/book-management/domain/book';
import {DataTransferService} from '../shared/service/data-transfer.service';
import {ChapterService} from '../pages/bookui-admin/book-management/service/chapter.service';
import {Chapter} from '../pages/bookui-admin/book-management/domain/chapter';
import {Section} from '../pages/bookui-admin/book-management/domain/section';
import {BookComponent} from './book/book.component';
import {ToasterUtils} from '../conf/util';

@Component({
  selector: 'ngx-fronts',
  templateUrl: './fronts.component.html',
})
export class FrontsComponent implements OnInit {

  loading: boolean;
  menus: NbMenuItem[];
  book: Book;
  chapters: Chapter[];
  sectionMap: Map<string, Section[]>;

  constructor(private dataTransferService: DataTransferService,
              private chapterService: ChapterService,
  ) {
  }

  ngOnInit() {
    this.sectionMap = new Map<string, Section[]>();
    this.chapters = [];
    this.menus = [];
    this.dataTransferService.currentBook.subscribe(book => this.book = book);
    this.getChaptersInBook();
  }

  private getChaptersInBook(): void {
    this.loading = true;
    const bookId = this.book ? this.book.bookId : new Book().bookId;
    this.chapterService.getChapters(bookId).subscribe(chapters => {
        if (chapters) {
          this.chapters = chapters;
        } else {
          BookComponent.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book Read - Menus',
            'Could not get chapters in ' + this.book.bookTitle);
        }
      },
      error => {
        this.loading = false;
        BookComponent.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book Read - Menus', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
        this.buildMenus(this.chapters);
      });
  }

  private buildMenus(chapters: Chapter[]): void {
    console.log(this.menus, chapters);
    if (chapters) {
      this.menus = [];
      this.menus = MENU_ITEMS;
      chapters.forEach(chapter => {
        const title = chapter.chapterTitle;
        const link = '/bookui-read/book/chapter/' + chapter.chapterId;
        // this.getSectionsInChapter(chapter);
        const menu: NbMenuItem = {
          title: title,
          link: link,
          icon: 'nb-play-outline',
        };

        this.menus.push(menu);
      });
    }
  }

  private populateRoleMgtMenu(): NbMenuItem {
    return {
      title: 'Role Management',
      icon: 'nb-flame-circled',
      link: '/bookui/admin/role-management',
      children: [
        {
          title: 'Roles',
          link: '/bookui/admin/role-management/roles',
        },
      ],
    };
  }
}
