import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Book, BookService } from '../../services/book-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast';



@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage implements OnInit{
  
  public book: Book;
  public isLoading: boolean = false;
  public id: number;
  //Reactive form
  public form: FormGroup;
  public submitted: boolean = false;
  public submittedValues = {};

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    public navParams: NavParams,
    private bookService: BookService,
    private toastServ: ToastService) {
  }

  ngOnInit(){
    this.book = this.navParams.get('book');
    this.form = this.formBuilder.group({
      title: [''],
      languaje: [''],
      edition: [''],
      publisher: ['']
    })

    this.form.patchValue(this.book);
  }

  formBookDetailSubmitted(){
    this.submittedValues = this.form.value;
    this.book = {
      id: this.book.id,
      ...this.form.value
    };
    this.submitted = true;
    this.bookService.saveBook(this.book).subscribe((book)=>{
      console.log(book);
      this.isLoading = false;
      this.toastServ.presentToast('Update succesfully');
    })
  }

  ionViewDidLoad() {
    
  }

}
