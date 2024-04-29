import {AfterViewInit, Component, Directive, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {isPlatformWorkerUi, NgClass, NgForOf} from "@angular/common";
import {CdkVirtualScrollViewport, ScrollingModule, VIRTUAL_SCROLL_STRATEGY} from "@angular/cdk/scrolling";
import {ChatService} from "../DBConnection/chat.service";
import {UserService} from "../DBConnection/user.service";
import {Chat} from "../DBClasses/Chat";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs";
import {MessagesService} from "../DBConnection/messages.service";
import {Message} from "../DBClasses/Message";
import {popNumber} from "rxjs/internal/util/args";
import {UpdateProject} from "@angular/cdk/schematics";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";


class UpdateResponse{
  data: Message[] = [];
  isUpdated: boolean = false;

  static parse(item : any) {
    let temp = new UpdateResponse();

    temp.isUpdated = item.isUpdated;
    for(let i of item.data) {
      temp.data.push(Message.parse(i));
    }

    return temp;
  }
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    NgForOf,
    ScrollingModule,
    NgClass
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild('messagesList') viewPort!: CdkVirtualScrollViewport;
  public items = Array.from({length: 100}).map((_, i) => {
    return {
      message: `Item #${i}`,
      sender: (i%2) ? true : false
    }
  });
  protected opendChat = -1;
  protected doUpdate = false;
  protected reciverId = -1;
  protected latestMessageId = -1;
  protected readonly userId ;
  protected chats: Chat[] = [];
  protected messages: Message[] = [];
  public messageInput: string = "asdfaaaaaaaaaaaa";
  private lastMessageIndex: number = 0;
  private sleepTimer = 5000;


  constructor(
    private chatService : ChatService,
    private userService : UserService,
    private cookieService : CookieService,
    private messageService : MessagesService
    ) {
    this.userId = +this.cookieService.get("UID");

  }

  ngOnDestroy(): void {
        this.doUpdate = false;
    }

  ngAfterViewInit(): void {
    console.log(this.viewPort)
    this.viewPort.scrollToIndex(this.lastMessageIndex, "instant");
    this.doUpdate = true;
  }

  ngOnInit(): void {
    console.log(this.viewPort)
    this.chatService.getByUserId(this.userId).subscribe(
      (resp : any) => {
        for (let chat of resp) {
          let temp = Chat.parse(chat);

          this.userService.getById((temp.userId == this.userId) ? temp.userId2 : temp.userId).subscribe(
            (respUser : any) => {
              temp.userName = respUser[0].userName;
              this.chats = [...this.chats, temp];
            }
          )
        }

      }
    )
  }

  setMessages(chat : Chat) {
    this.messages = [];
    let temp: Message[] = []
    this.opendChat = chat.id;
    this.reciverId = (chat.userId == this.userId) ? chat.userId2 :  chat.userId;

    this.messageService.getAllByChatId(chat.id).subscribe(
      (resp: any) => {
        this.lastMessageIndex = 0;
        for (let msg of resp) {
          this.lastMessageIndex++;
          let message = Message.parse(msg);
          this.messages = [...this.messages, message];
          this.latestMessageId = (this.latestMessageId < message.id) ? message.id : this.latestMessageId;
          this.scrollToEnd();
        }


        this.updateMessages(chat);
      }
    );
    this.viewPort.scrollToIndex(this.messages.length, "smooth");
  }

  async updateMessages(chat : Chat) {
    this.opendChat = chat.id;
    let sleepTimer  = 3000;
    let updated = this.messages.length;
    this.reciverId = (chat.userId == this.userId) ? chat.userId2 :  chat.userId;

    while(this.doUpdate) {
      if (this.messages.length == updated) {
        this.viewPort.scrollToIndex(this.messages.length, "smooth");
        updated = 0;
        this.sleepTimer = 5000;
      }

      let subscription = this.messageService.getMessageUpdate(chat.id, this.latestMessageId).subscribe(
        async (resp: any) => {
          if (resp.isUpdated) {
            for (let message of resp.data) {
              this.lastMessageIndex++
              this.messages = [...this.messages, Message.parse(message)];
              console.log((this.latestMessageId < message.id) ? message.id : this.latestMessageId);
              this.latestMessageId = (this.latestMessageId < message.id) ? message.id : this.latestMessageId;
            }

            updated = this.messages.length;
            this.scrollToEnd();
            this.sleepTimer = 50;
            console.log(this.viewPort);
            subscription.unsubscribe();
          }
        }
      );
      await this.sleep(this.sleepTimer);
    }
  }

  async sendMessage() {
    if (this.messageInput != '') {
      this.messageService.insertMessage(this.opendChat, this.messageInput, this.userId, this.reciverId).subscribe();
      await this.sleep(50);
      this.messageInput = '';
      this.viewPort.scrollToIndex(this.messages.length + 1);
    }
  }

  private scrollToEnd() {
    this.viewPort.scrollToIndex(this.messages.length, "smooth");
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(
      (resolve) => setTimeout(resolve, ms));
  }
}
