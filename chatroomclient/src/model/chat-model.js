//import chatPiece from './chat-piece';

class chatModel {
  constructor(chatData) {
    this.chats = chatData.chats; //Conversations shown on left panel
    this.filtered_chats = chatData.filtered_chats; //If user filters them ..
    this.messages = chatData.messages; //Messages shown in chat bar
    this.active_user = chatData.active_user; //Active user id
    this.usersLoaded = chatData.usersLoaded; //Bool if users are loaded
  }

  static initialize() {
    let data = {
      chats: [],
      messages: [],
      filtered_chats: [],
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
    this.filtered_chats = this.chats;
    this.active_user = this.chats[0];
  }

  Filter(text) {
    if (text === "") {
      this.filtered_chats = this.chats;
    }
    else {
      this.filtered_chats = this.chats.filter(function (chat) {
        return (chat.wholeName.toLowerCase()).includes(text.toLowerCase());
      })
    }
  }
}

export default chatModel;