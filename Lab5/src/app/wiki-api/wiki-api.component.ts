import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {switchMap, debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-wiki-api',
  templateUrl: './wiki-api.component.html',
  styleUrls: ['./wiki-api.component.css']
})
export class WikiApiComponent implements OnInit {
  apiUrl = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
  searchTerm = '';
  results: Observable<any>;
  latestResults = new Subject<any>();

  constructor(private http: HttpClient,
              private router: Router) {
    this.results = this.latestResults.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(searchTerm => !!searchTerm),
      switchMap(searchPhrase => this.http.get<any>(`${this.apiUrl}${searchPhrase}`).pipe(
        map(data => {
          console.log(data);
          return this.openSearchConverter(data);
        })
        )
      )
    );
  }

  ngOnInit() {
  }

  search(searchPhrase) {
    this.latestResults.next(searchPhrase);
  }

  routeToArticle(result) {
    this.router.navigate(['/', result.term], { state: { description: `${result.description}`} });
  }

  openSearchConverter(osResults) {
    console.log(osResults);
    const results = [];
    for (let i = 0; i < osResults[1].length; i++) {
      results.push({
        term: osResults[1][i],
        description: osResults[2][i],
        url: osResults[3][i],
      });
    }
    return results;
  }

}
