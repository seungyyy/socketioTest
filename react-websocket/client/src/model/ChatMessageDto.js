export class ChatMessageDto { 
  constructor(user, message, time) { 
    this.user = user;
    this.message = message;
    this.time = time;
  }
}