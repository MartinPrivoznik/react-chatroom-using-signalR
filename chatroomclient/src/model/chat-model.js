//import chatPiece from './chat-piece';

class chatModel {
  constructor(chatData) {
    this.chats = chatData.chats; //Conversations shown on left panel
    this.messages = chatData.messages; //Messages shown in chat bar
    this.active_user = chatData.active_user; //Active user id
    this.usersLoaded = chatData.usersLoaded; //Bool if users are loaded
  }

  static initialize() {
    let data = {
      chats: [],
      messages: [],
      active_user: { wholeName: "", id: "", lastMessage: "" },
      usersLoaded: false
    };

    return new chatModel(data);
  }

  LoadChat(mess) {
    this.messages = mess;
  }

  LoadConversations(users) {
    this.chats = users;
    this.active_user = this.chats[0];
  }
}

export default chatModel;