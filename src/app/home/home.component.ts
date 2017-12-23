import { Component, OnInit } from '@angular/core';
import { animate,trigger, style, transition, keyframes, query, stagger, AnimationKeyframesSequenceMetadata } from '@angular/animations';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
        transition('* => *', [
         query(':enter', style({ opacity: 0 }), {optional: true}),
         query(':enter', stagger('300ms', [
           animate('.6s ease-in',
           keyframes ([
             style({ opacity: 0, transform: 'translateY(-75%)' , offset: 0 }),
             style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
             style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
           ])
          )
         ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))
        ]), { optional: true })

        ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount = 4;
  btnText = 'Add an item';
  goalText = 'My first life goal';


  // goals = ['Buy a house', 'Own a business'];
  goals = [];

  constructor( private data: DataService) { }

  ngOnInit() {
    this.data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this.data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this.data.changeGoal(this.goals);
  }
  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this.data.changeGoal(this.goals);
  }


}
