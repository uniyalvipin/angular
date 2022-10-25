import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  dishErrMsg: string;
  constructor(private leaderService: LeaderService) {}

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe({
      next: (leaders) => (this.leaders = leaders),
      error: (err) => (this.dishErrMsg = err),
    });
  }
}
