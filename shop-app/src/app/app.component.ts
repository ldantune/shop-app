import { User } from './auth/models/user';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-app';

  user$: Observable<User>;
  authenticated$: Observable<boolean>;

  logout() {
    
  }
}
