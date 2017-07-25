import {Injectable,EventEmitter} from '@angular/core';
import * as _ from 'underscore';
import { CommunicationService, ChannelCommunicationService } from 'chat-codes-services/src/communication-service';
import { ChatUserList, ChatUser } from 'chat-codes-services/src/chat-user';
import { PusherCommunicationLayer } from 'chat-codes-services/src/pusher-communication-layer';
import { MessageGroups, MessageGroup } from 'chat-codes-services/src/chat-messages';
import { CREDENTIALS } from './pusher-credentials';


@Injectable()
export class WebCommunicationService {
    constructor(private userName:string, private channelName:string) {
        this.commService = new CommunicationService(false, userName, CREDENTIALS.key, CREDENTIALS.cluster);
        this.channelService = this.commService.createChannelWithName(channelName);
        (this.channelService as any).on('members-changed', (e) => { this.membersChanged.emit(e); });
        (this.channelService as any).on('message', (e) => { this.message.emit(e); });
        (this.channelService as any).on('typing-status', (e) => { this.typingStatus.emit(e); });
        (this.channelService as any).on('editor-event', (e) => { this.editorEvent.emit(e); });
        (this.channelService as any).on('cursor-event', (e) => { this.cursorEvent.emit(e); });
        (this.channelService as any).on('editor-state', (e) => { this.editorState.emit(e); });
        (this.channelService as any).on('editor-opened', (e) => { this.editorOpened.emit(e); });
        (this.channelService as any).on('terminal-data', (e) => { this.terminalData.emit(e); });

        this.userList = this.channelService.userList;
        this.messageGroups = this.channelService.messageGroups;
    }
    private commService:CommunicationService;
    private channelService:ChannelCommunicationService;
    public ngOnDestroy() {
        this.commService.destroy();
    }
    public ready() { return this.channelService.ready(); };
    public sendTextMessage(data) { this.channelService.sendTextMessage(data); };
    public sendTypingStatus(data) { this.channelService.sendTypingStatus(data); };
    public emitEditorChanged(data) { this.channelService.emitEditorChanged(data); };
    public emitCursorPositionChanged(data) { this.channelService.emitCursorPositionChanged(data); };
    public emitCursorSelectionChanged(data) { this.channelService.emitCursorSelectionChanged(data); };
    public writeToTerminal(data) { this.channelService.writeToTerminal(data); };


    public membersChanged: EventEmitter<any> = new EventEmitter();
    public message: EventEmitter<any> = new EventEmitter();
    public typingStatus: EventEmitter<any> = new EventEmitter();
    public editorEvent: EventEmitter<any> = new EventEmitter();
    public cursorEvent: EventEmitter<any> = new EventEmitter();
    public editorState: EventEmitter<any> = new EventEmitter();
    public editorOpened: EventEmitter<any> = new EventEmitter();
    public terminalData: EventEmitter<any> = new EventEmitter();

    public userList:ChatUserList;
    public messageGroups:MessageGroups;

    private commLayer:PusherCommunicationLayer;
    private myID:string;
}