//import chatPiece from './chat-piece';

class chatModel {
    constructor(chatData) {
      this.chats = chatData.chats; //Conversations shown on left panel
      this.messages = chatData.messages; //Messages shown in chat bar
    }
  
    static initialize() {
      let data = {
        chats: [],
        messages: []
      };
  
      return new chatModel(data);
    }
    
    LoadChat(mess)
    {
        this.messages = mess;
    }

    LoadConversations(users)
    {
        this.chats = users;
    }
}
  
  export default chatModel;