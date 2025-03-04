import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core'; 
import {FormsModule} from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router, RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,DxButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
}) 
export class SearchComponent implements OnInit {
 
  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('loginData')!==null;

  }
  searchTerm="";
  isLoggedIn:boolean = false;
  constructor(private searchService: SearchService,private router: Router) { 
  }

  onsearch(){
    if(this.searchTerm.trim()){
    this.searchService.updateSearchQuery(this.searchTerm);
    this.router.navigate(['/result']);
  }
  else{
    alert('Please enter a search term');
  }
}

logOut(){
  console.log("logOut");
  localStorage.removeItem('loginData');
  this.router.navigate(['/']);
}
}
