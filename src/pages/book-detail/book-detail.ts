import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Book, BookService } from '../../services/book-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { ConfirmAlertService } from '../../services/confirmAlert';
import { BookListPage } from '../book-list/book-list';



@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage implements OnInit {

  public book: Book;
  public id: number;
  //Reactive form
  public form: FormGroup;
  public submitted: boolean = false;
  public submittedValues = {};

  public isSubmitting: boolean = false;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private bookService: BookService,
    private toastService: ToastService,
    private confirmAlertService: ConfirmAlertService) {
  }

  ngOnInit() {
    this.book = this.navParams.get('book');
    this.form = this.formBuilder.group({
      title: [''],
      language: [''],
      edition: [''],
      publisher: ['']
    })

    this.form.patchValue(this.book);
  }

  formBookDetailSubmitted() {
    this.isSubmitting = true;
    this.submittedValues = this.form.value;
    this.book = {
      id: this.book.id,
      ...this.form.value
    };

    this.submitted = true;
    this.bookService.saveBook(this.book).subscribe((book) => {
      this.toastService.presentToast('Update succesfully');
      this.isSubmitting = false;
    }, () => {
      this.isSubmitting = false;
      this.toastService.presentToast('Update error');
    })
  }

  deleteBook() {
    this.isSubmitting = true;
    this.confirmAlertService.presentConfirm('Book deletion confirmation', 'Are you sure you want delete this book?');
    this.confirmAlertService.okPressed.subscribe(() => {
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        this.navCtrl.setRoot(BookListPage);
        this.toastService.presentToast('Book deleted successfully');
        this.isSubmitting = false;
      }, () => {
        this.isSubmitting = false;
      });
    });

    this.confirmAlertService.cancelPressed.subscribe(() => {
      this.toastService.presentToast('Operation canceled');
    });
  }

}
