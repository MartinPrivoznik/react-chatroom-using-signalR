//Conversation window
class chatPiece {
    constructor(index, active, last_message) {
      this.index = index;
      this.active = active;
      this.last_message = last_message;
    }
  
    set_name(name) {
        this.name = name;
    }

    set_activity() {
      this.active = !this.active;
    }

    set_last_message(value) {
        this.last_message = value; 
    }
}

export default chatPiece;
  