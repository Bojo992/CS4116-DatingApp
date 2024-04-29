import {ChatComponent} from "../chat/chat.component";

export class Chat{
  id = 0;
  userId = 0;
  userId2 = 0;
  userName = '';

  public static parse(item : any) {
    let temp = new Chat();
    temp.id = item.id;
    temp.userId = item.userId;
    temp.userId2 = item.userId2;

    return temp;
  }
}
