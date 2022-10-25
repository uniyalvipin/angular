import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut()],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: any
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe({
      next: (dish) => (this.dish = dish),
      error: (err) => (this.dishErrMsg = err),
    });

    this.promotionService.getFeaturedPromotion().subscribe({
      next: (promotion) => (this.promotion = promotion),
      error: (err) => (this.dishErrMsg = err),
    });

    this.leaderService.getFeaturedLeader().subscribe({
      next: (leader) => (this.leader = leader),
      error: (err) => (this.dishErrMsg = err),
    });
  }
}
