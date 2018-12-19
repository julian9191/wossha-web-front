import { Component } from '@angular/core';
import { ChatAdapter } from './components/components/ng-chat/core/chat-adapter';
import { DemoAdapter } from './components/components/ng-chat/chat-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public adapter: ChatAdapter = new DemoAdapter();
  public isLoggedIn = true;

  loggedinListener(event){
    alert("entra");
  }

}
