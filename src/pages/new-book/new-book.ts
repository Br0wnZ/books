import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BookService } from "../../services/book-service";
import { ToastService } from "../../services/toast";


@Component({
    selector: 'new-book',
    templateUrl: 'new-book.html'
})export class NewBookPage implements OnInit{

    public form: FormGroup;
    public title: string;
    public bookAdded: boolean;
    public id: number;

    constructor( private formBuilder: FormBuilder,
                 private bookService: BookService,
                 private toastService: ToastService ){

    }

    ngOnInit(){
        this.bookAdded = false;
        this.title = 'New Book';
        this.form = this.formBuilder.group({
            title: [''],
            language: [''],
            edition: [''],
            publisher: ['']
          })
    }

    addBookSubmmited(){
        this.bookService.addBook(this.form.value).subscribe(()=>{
            this.toastService.presentToast('Book added successfully.');
            this.bookAdded = true;
            this.title = this.form.value.title;
            this.id = this.form.value.id;
        }, () => {
            this.toastService.presentToast('Error.')
        })
    }

    deleteBook(){
        
    }
}