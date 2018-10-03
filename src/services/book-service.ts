import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export interface Book{
    id: number;
    title: string;
    languaje: string;
    edition: string;
    publisher: string;
}

@Injectable()
export class BookService{

    private readonly booksEndpoint;

  constructor(private http: HttpClient) {
    this.booksEndpoint = 'http://localhost:3000/books';
  }

  getBooks(): Observable<Book[]> {
    return <Observable<Book[]>>
      this.http.get(this.booksEndpoint);
  }

  saveBook(book: Book): Observable<Book> {

    return <Observable<Book>>
      this.http.put(`${this.booksEndpoint}/${book.id}`, book);
  }

  addBook(book: Book): Observable<Book>{
    return this.http.post(`${this.booksEndpoint}`, book) as Observable<Book>;
  }
    
}