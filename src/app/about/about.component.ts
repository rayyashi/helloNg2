import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { DataService } from '../data.service';

@Component ({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  goals: any;

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) {
    this.route.params.subscribe(res => console.log(res.id));
   }

  ngOnInit() {
    this.data.goal.subscribe(a => this.goals = a);
  }

  sendMeHome() {

    this.router.navigate(['']);
  }

}
