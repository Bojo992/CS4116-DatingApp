import {MessagesService} from "../DBConnection/messages.service";

export class Message {
  id = 0;
  chatId = 0;
  message = '';
  from = 0;
  to = 0;
  reactionsNum = 0;
  isPhoto = false;
  replyMessageId = 0;

  public static parse(item : any) {
    let temp = new Message();

    temp.id = item.id;
    temp.chatId = item.chatId;
    temp.message = item.message;
    temp.from = item.from;
    temp.to = item.to;
    temp.reactionsNum = item.reactionsNum;
    temp.isPhoto = item.isPhoto;
    temp.replyMessageId = item.replyMessageId;

    return temp;
  }
}
