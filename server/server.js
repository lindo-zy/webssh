const WebSocket = require('ws');
const wss = new WebSocket.Server({host: '0.0.0.0', port: 8999});


function createWebSocket() {
    //创建websocket链接

}


wss.on('connection', function connection(ws) {
    const conn = new Client();
    conn.on('ready', () => {
        ws.conn = conn;
        ws.send('SSH connection established!');
    });
    conn.connect({
        host: 'ssh.example.com',
        username: 'username',
        password: 'password'
    });
});

wss.on('message', function incoming(message) {
    wss.conn.exec(message, (err, stream) => {
        if (err) throw err;

        stream.on('data', (data) => {
            wss.send(data.toString());
        })
            .stderr.on('data', (data) => {
            ws.send(data.toString(), {isError: true});
        });
    });
});

wss.on('close', function close() {
    wss.conn.end();
});