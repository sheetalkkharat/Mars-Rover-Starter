const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function () {
    const roverObject = new Rover(98382);
    expect(roverObject.position).toBe(98382);
    expect(roverObject.generatorWatts).toBe(110);
    expect(roverObject.mode).toBe('NORMAL');
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);    // Passes 98382 as the rover's position.
    const response = rover.receiveMessage(message);
   expect(response.message).toBe(message.name);
  });



  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);    // Passes 98382 as the rover's position.
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2)
  });


  it("responds correctly to the status check command", function (){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);    // Passes 98382 as the rover's position.
    const response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus).toEqual(new Rover(98382, "LOW_POWER", 110))
  });


  it("responds correctly to the mode change command", function (){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);    // Passes 98382 as the rover's position.
    const response = rover.receiveMessage(message);

    expect(response.results[1].completed).toEqual(true);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function (){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('responds with a false completed value when attempting to move in LOW_POWER mode', commands);
    const rover = new Rover(98382);    // Passes 98382 as the rover's position.
    const response = rover.receiveMessage(message);

    expect(response.results[0].completed).toEqual(false);
  });


it("responds with the position for the move command", function (){
  const commands = [new Command('MOVE')];
  const message = new Message('responds with the position for the move command', commands);
  const rover = new Rover(98372);    // Passes 98382 as the rover's position.
  const response = rover.receiveMessage(message);

  expect(response.results[0].completed).toEqual(true);
  expect(response.results[0].roverStatus.position).toEqual(new Rover(98382, "LOW_POWER", 110));
});


});