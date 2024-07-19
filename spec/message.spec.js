const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('name is required.'));
      }); 

      it("constructor sets name", function() {
        const name = "Unit Test";
        const messageObject = new Message(name);
    
        expect(messageObject.name).toBe(name);
      });
    
      it("constructor sets a value passed in as the 2nd argument", function() {
        const commands = "MOVE";
        const name = "Unit Test";
        const messageObject = new Message(name ,commands);
    
        expect(messageObject.commands).toBe(commands);
      });
});
