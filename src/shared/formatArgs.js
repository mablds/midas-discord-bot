module.exports = (commandPrefix, fullCommand) => {
    const argument = fullCommand.substring(commandPrefix.length).trim();

    if(!argument) return null;

    return argument;
}