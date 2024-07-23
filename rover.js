const Command = require("./command");

class Rover {
    constructor(position, mode = "NORMAL", generatorWatts = 110) {
        this.position = position;
        this.mode = mode;
        this.generatorWatts = generatorWatts;
    }

    receiveMessage(message) {
        let returnMessage = {
            message: message.name,
            results: []
        };

        for (let command of message.commands) {
            let result = { completed: false };

            if (command.commandType === 'MODE_CHANGE') {
                this.mode = command.value;
                if(this.mode === 'LOW_POWER') {
                    result.completed = false;
                } else{
                    result.completed = true;
                    result.roverStatus = {
                        mode: this.mode,
                    };
                }   
            } else if (command.commandType === 'MOVE') {
                if (this.mode === 'NORMAL') {
                    this.position = command.value;
                    result.completed = true;
                } else {
                    result.completed = false;
                }
            } else if (command.commandType === 'STATUS_CHECK') {
                result.completed = true;
                result.roverStatus = {
                    position: this.position,
                    mode: this.mode,
                    generatorWatts: this.generatorWatts
                };
            }

            returnMessage.results.push(result);
        }

        return returnMessage;
    }
}

module.exports = Rover;
