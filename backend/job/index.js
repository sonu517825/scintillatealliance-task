const Constant = require('../constant/constant')

module.exports = {
    startVotingEvent: (io) =>
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * Constant.votingOptions.length);

            const votingEvent = Constant.votingOptions?.[randomIndex] ||
            {
                title: "Vote for favorite programming language",
                options: ["JavaScript", "Python", "Java", "C#"],
            };

            votingEvent.timestamps = new Date().getTime()
            io.emit('votingEvent', votingEvent);

        }, 60000)
}
