/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChatComponent } from './ng-chat.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NgChatComponent ],
    exports: [ NgChatComponent ]
})

export class NgChatModule {}*/


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgChat } from './ng-chat.component';
import { EmojifyPipe } from './pipes/emojify.pipe';
import { LinkfyPipe } from './pipes/linkfy.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [NgChat, EmojifyPipe, LinkfyPipe],
  exports: [NgChat]
})
export class NgChatModule {
}