import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Book, BookService } from '../../services/book-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { ConfirmAlertService } from '../../services/confirmAlert';
import { BookListPage } from '../book-list/book-list';
import { TranslateService } from '@ngx-translate/core';



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
    private confirmAlertService: ConfirmAlertService,
    private translate: TranslateService) {
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
    let update, error: string;
    this.translate.get('updateSuccesfully')
    .subscribe(res =>{
      update = res;
    })
    this.translate.get('updateError')
    .subscribe(res =>{
      error = res;
    })
    this.submitted = true;
    this.bookService.saveBook(this.book).subscribe((book) => {
      this.toastService.presentToast(update);
      this.isSubmitting = false;
    }, () => {
      this.isSubmitting = false;
      this.toastService.presentToast(error);
    })
  }

  deleteBook() {
    this.isSubmitting = true;
    let confirm:string;
    let sure: string;
    
    this.translate.get('bookDetails.confirm').subscribe(res => {
      confirm = res;
      
    })
    this.translate.get('bookDetails.areYouSure').subscribe(res => {
      sure = res;
    })
    
    this.confirmAlertService.presentConfirm(confirm, sure);
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
