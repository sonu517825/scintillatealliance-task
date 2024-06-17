const Global = require('../global/client')
const Chat = require('../schemas/chat')
const Job = require('../job/index')

const handleIO = (io) => {

    io.on('connection', (socket) => {

        socket.on('connectUser', (data) => {
            if (data.username) {
                Global.Client.set(data.username, socket)
                console.log('Client Online:', data.username);
                io.emit('isOnline', data);
            }
        });

        socket.on('sendMessageToServer', async (msg) => {
            console.log(`Message from ${msg.sender}: ${msg.content}`);
            await Chat.create(msg)
            io.emit('messageFromServer', msg);
        });

        socket.on('vote', (msg) => {
            console.log(`Vote from`, msg);

        });

        socket.on('disconnect', (data) => {
            console.log('Client disconnected:');
        });
    });

    Job.startVotingEvent(io)

}

module.exports = { handleIO }