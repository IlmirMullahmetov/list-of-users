import { createServer } from 'miragejs'

let users = [
    { id: 1, name: 'Кузнецов', role: 'Программист', characteristic: 'Любит футбол' },
    { id: 2, name: 'Петров', role: 'Дизайнер', characteristic: 'Часто пьёт кофе' },
    { id: 3, name: 'Фролов', role: 'Машинист', characteristic: 'Любит рыбалку' },
]

createServer({
    routes() {

        this.namespace = 'api'

        this.post('/users', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            attrs.id = Math.floor(Math.random() * 100)
            users.push(attrs)
            return { user: attrs }

        })

        this.del('/users/:id', (schema, request) => {
            let id = JSON.parse(request.params.id)
            const newUsers = users.filter(user => user.id !== id)
            users = newUsers
            return { users: users }
        })

        this.get('/users', () => {
            return {
                users
            }
        })

        this.get('/users/:id', (schema, request) => {
            let id = JSON.parse(request.params.id);
            const user = users.find(user => user.id === id)
            return {
                user
            }
        })

        this.put('/users', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            console.log(users)
            users.forEach((user) => {
                if (user.id === attrs.id) {
                    user.name = attrs.name
                    user.role = attrs.role
                    user.characteristic = attrs.characteristic
                }
            })
            return { users }
        })
    },
})