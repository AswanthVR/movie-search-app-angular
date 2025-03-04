import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cast-and-crew-details',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './cast-and-crew-details.component.html',
  styleUrl: './cast-and-crew-details.component.scss'
})
export class CastAndCrewDetailsComponent implements OnInit {

  movie:any;

  constructor(private route : ActivatedRoute){}

  ngOnInit(): void {
   this.route.queryParams.subscribe(params=>{
    if(params['movie']){
      this.movie = JSON.parse(params['movie']);
    }
   })   
  }
}
