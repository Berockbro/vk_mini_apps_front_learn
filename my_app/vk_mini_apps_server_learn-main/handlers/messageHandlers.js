const { nanoid } = require('nanoid')

const low = require ('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

db.defaults({
    messages: [
        {
            messageId: '1',
            userId: '1',
            senderName: 'Bob',
            messageText: 'What are you doing here?',
            createdAT: '2021-01-14',
            avatar: 'https://uznayvse.ru/images/stories2016/uzn_1473759739.jpg'
        },
        {
            messageId: '2',
            userId: '2',
            senderName: 'Alice',
            messageText: 'Go back to work!',
            createdAT: '2021-02-15',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqwZ5fpJLcNkDSmmD33NwXgk246a2062GYw&usqp=CAU'
        }
    ]
}).write()

module.exports = (io,socket) => {
    const getMessages = () => {
        const messages = db.get('messages').value()
        io.emit('messages', messages)
    }

    const addMessage = (message) => {
        db.get('messages')
        .push({
            messageId: nanoid(8),
            createAt: new Date(),
            ...message
        })
        .write()
        getMessages()
    }
    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
}