import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errMsg: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL: any
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes) => (this.dishes = dishes),
      error: (err) => (this.errMsg = err),
    });
  }
}
