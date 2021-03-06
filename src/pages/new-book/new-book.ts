import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookService } from "../../services/book-service";
import { ToastService } from "../../services/toast";
import { ConfirmAlertService } from "../../services/confirmAlert";
import { NavController } from "ionic-angular";
import { BookListPage } from "../book-list/book-list";
import { TranslateService } from "@ngx-translate/core";


@Component({
    selector: 'new-book',
    templateUrl: 'new-book.html'
})export class NewBookPage implements OnInit{

    public form: FormGroup;
    public title: string;
    public bookAdded: boolean;
    public isLoading: boolean;
    public id: number;

    constructor( private formBuilder: FormBuilder,
                 private bookService: BookService,
                 private toastService: ToastService,
                 private confirmAlertService: ConfirmAlertService,
                 private navContrl : NavController,
                 private translate: TranslateService ){

    }

    ngOnInit(){
        this.bookAdded = false;
        this.title = 'New Book';
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            language: ['', Validators.required],
            edition: ['', Validators.required],
            publisher: ['', Validators.required]
          })
    }

    addBookSubmmited(){
        this.isLoading = true;
        let bookAdded: string;
        this.translate.get('bookAdded').subscribe(res=>{
            bookAdded = res;
        })
        this.bookService.addBook(this.form.value).subscribe((book)=>{
            this.toastService.presentToast(bookAdded);
            this.bookAdded = true;
            this.title = this.form.value.title;
            this.id = book.id;
            this.isLoading = false;
        }, () => {
            this.toastService.presentToast('Error.')
        })
    }

    deleteBook(){
        this.confirmAlertService.presentConfirm('Book deletion confirmation', 'Are you sure you want delete this book?');

        this.confirmAlertService.okPressed.subscribe(() => {
            
            this.bookService.deleteBook(this.id).subscribe(() => {
                this.navContrl.setRoot(BookListPage);
                this.toastService.presentToast('Book deleted successfully');
            });   
        });

        this.confirmAlertService.cancelPressed.subscribe(() => {
            this.toastService.presentToast('Operation canceled');
        });
    }
}