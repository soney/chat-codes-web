import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameEntry } from './name-entry/name-entry.component';
import { ChatInput } from './chat-input/chat-input.component';
import { EditorDisplay } from './editor/editor.component';
import { UserDisplay } from './user/user-display.component';
import { AceEditorModule } from 'ng2-ace-editor';

import { PusherService } from './pusher.service';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    ChatInput,
    NameEntry,
    UserDisplay,
    EditorDisplay
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MomentModule,
    AceEditorModule
  ],
  providers: [ PusherService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
