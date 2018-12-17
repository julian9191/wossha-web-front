import { Component } from '@angular/core';
import { ChatAdapter } from './components/components/ng-chat/core/chat-adapter';
import { DemoAdapter } from './demo-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public adapter: ChatAdapter = new DemoAdapter();

}
