//ssh2客户端
const SSHClient = require('ssh2').Client;
const Server = require('ws').Server;

//todo 做成配置
const wss = new Server({
    host: '0.0.0.0',
    port: 8099
});

//ssh服务器信息
const serverInfo = {
    host: '',
    port: 22,
    username: 'root',
    password: '123456'
};

function createSocket(ws) {
    const ssh = new SSHClient();
    ssh.on('ready', function () {
        ws.send(`***${serverInfo.host} SSH CONNECTION ESTABLISHED***\r\n`);
        ssh.shell({term: 'xterm'}, function (err, stream) {
            if (err) {
                return ws.emit(`\r\n***SSH SHELL ERROR:${err.message}***\r\n`);

            }
            ws.on('message', function (data) {
                stream.write(data);
            });
            ws.on('close', function (data) {
                ssh.end();
            });
            stream.on('data', function (d) {
                const data = d.toString();
                //回显到控制台的数据
                ws.send(data);
            }).on('close', function () {
                ssh.end();
            });
        }).on('close', function () {
            ws.close();
        }).on('error', function (err) {
            ws.close();
        }).connect(serverInfo);
    });

}


wss.on('connection', function (ws, req) {
    createSocket(ws);
}).on('error', function (err) {
    console.log(err);
});