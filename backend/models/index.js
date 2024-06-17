const Contact = require('../schemas/chat');
const HttpError = require('../error/httpError');
const Global = require('../global/client')
const Chat = require('../schemas/chat')

const connect = async (body = {}) => {
    try {
        if (Global.Client.has(body.username)) {
            throw new HttpError("Someone is already connected with username: " + body.username, 400)
        }

        return {
            status: true,
            data: await Chat.find().sort({ _id: -1 }).limit(20)
        }
    } catch (error) {
        throw new HttpError(error.message || "Something went wrong.", error.statusCode || 500)
    }
};

module.exports = {
    connect
}