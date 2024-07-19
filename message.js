

class Message {
   constructor(name, commands) {
      this.name = name;
      this.commands = commands;
      if (!name) {
         throw Error("name is required.");
   }

   }
}
module.exports = Message;