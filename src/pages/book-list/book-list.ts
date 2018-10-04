import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book, BookService } from "../../services/book-service";
import { Subscription } from "rxjs/Subscription";
import { NavController } from "ionic-angular";
import { BookDetailPage } from "../book-detail/book-detail";
import { NewBookPage } from "../new-book/new-book";


@Component({
    selector: 'booklist',
    templateUrl: 'book-list.html'
  })
  export class BookListPage implements OnInit, OnDestroy {

    private isLoading: boolean;
    private books: Book[];
    public errorLoading: boolean = false;

    private bookSubscription: Subscription;

    constructor(private navCtrl: NavController,
        private bookService: BookService){

    }

    loadBookList(){
        this.isLoading = true;
        this.errorLoading = false;
        this.bookSubscription = this.bookService.getBooks()
        .subscribe((books: Book[])=>{
            this.books = books;
            this.isLoading = false;
            this.errorLoading = false;
        }, (error)=>{
            this.errorLoading = true;
            this.isLoading = false;
        })
    }

    ngOnInit(){
        this.isLoading = true;
        this.bookSubscription = this.bookService.getBooks()
        .subscribe((books: Book[])=>{
            this.books = books;
            this.isLoading = false;
            this.errorLoading = false;
        }, (error)=>{
            this.isLoading = false;
            this.errorLoading = true;
        })
    }

    ngOnDestroy(){
        if(this.bookSubscription){
            this.bookSubscription.unsubscribe();
        }
    }

    showDetails(book){
        this.navCtrl.push(BookDetailPage,{
            book: book
        });
    }

    addBook(){
        this.navCtrl.push(NewBookPage);
    }
  }
