/* eslint-disable max-len */
const WebSocket = require('ws');
var models = require('./server.js').models;

const ws = new WebSocket.Server({port: 8080});
const clients = [];

ws.on('connection', (ws) => {
  function getInitialThreads(userId) {
    models.Thread.find({where: {}}, (err, threads) => {
      console.log('threads:222222 ', threads);
      if (!err && threads) {
        console.log('burasi: ');
        ws.send(JSON.stringify({
          type: 'INITIAL_THREADS',
          data: threads,
        }));
      }
    });
  }
  function login(email, pass) {
    models.User.login({email: email, password: pass}, (err, result) => {
      if (err) {
        ws.send(JSON.stringify({
          type: 'ERROR',
          error: err,
        }));
      } else {
        models.User.findOne({where: {id: result.userId}, include: 'Profile'}, (err2, user) => {
          if (err2) {
            ws.send(JSON.stringify({
              type: 'ERROR',
              error: err,
            }));
          } else {
            ws.uid = user.id + new Date().getTime().toString();
            const userObject = {
              id: user.id,
              email: user.email,
              ws: ws,
            };
            clients.push(userObject);
            console.log('current clients: ', clients);
            getInitialThreads(user.id);
            ws.send(JSON.stringify({
              type: 'LOGGEDIN',
              data: {
                session: result,
                user: user,
              },
            }));
          }
        });
      }
    });
  }

  ws.on('close', (req) => {
    console.log('req: ', req);
  });

  ws.on('message', (message) => {
    console.log('Got message', JSON.parse(message));
    let parsed = JSON.parse(message);
    if (parsed) {
      switch (parsed.type) {
        case 'SIGNUP':
          models.User.create(parsed.data, (err, user) => {
            if (err) {
              ws.send(JSON.stringify({
                type: 'ERROR',
                error: err,
              }));
            } else {
              models.Profile.create({
                userId: user.id,
                name: parsed.data.name,
                email: parsed.data.email,
              }, (profileError, profile) => {

              });
            }
          });
        case 'CONNECT_WITH_TOKEN':
          models.User.findById(parsed.data.userId, (err2, user) => {
            if (!err2 && user) {
              ws.uid = user.id + new Date().getTime().toString();
              const userObject = {
                id: user.id,
                email: user.email,
                ws: ws,
              };
              clients.push(userObject);
            }
            getInitialThreads(user.id);
          });
          break;
        case 'LOGIN':
          login(parsed.data.email, parsed.data.password);
          break;
        case 'SEARCH':
          models.User.find({where: {email: {like: parsed.data}}}, (err2, users) => {
            if (!err2 && users) {
              ws.send(JSON.stringify({
                type: 'GOT_USERS',
                data: {
                  users: users,
                },
              }));
            }
          });
          break;
        case 'FIND_THREAD':
          models.Thread.findOne({where: {
            and: [
              {users: {like: parsed.data[0]}},
              {users: {like: parsed.data[1]}},
            ],
          }}, (err, thread) => {
            console.log('thread: ', thread);
            if (!err && thread) {
              ws.send(JSON.stringify({
                type: 'ADD_THREAD',
                data: thread,
              }));
            } else {
              models.Thread.create({
                lastUpdated: new Date(),
                users: parsed.data,
              }, (err2, thread) => {
                console.log('err2: ', err2);
                console.log('thread22222: ', thread);
                if (!err2 && thread) {
                  console.log('clients.filtersssss', clients.filter(u => thread.users.indexOf(u.id.toString()) > -1));
                  clients.filter(u => thread.users.indexOf(u.id.toString()) > -1).map(client => {
                    console.log('client: ', client);
                    client.ws.send(JSON.stringify({
                      type: 'ADD_THREAD',
                      data: thread,
                    }));
                  });
                }
              });
            }
          });
          break;
        case 'THREAD_LOAD':

        default:
          console.log('nothing to see here');
      }
    }
  });
});
