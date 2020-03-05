import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  description;

  constructor(private router: Router) {
    this.description = this.router.getCurrentNavigation().extras.state.description;
  }

  ngOnInit() {
  }

}
