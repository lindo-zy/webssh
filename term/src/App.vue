<template>
  <div id="xterm">

  </div>

</template>

<script>
import {FitAddon} from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import {Terminal} from 'xterm';
import {AttachAddon} from 'xterm-addon-attach/src/AttachAddon';

export default {
  name: 'App',
  data() {
    return {
      // 保存terminal实例
      term: '',
      //socket链接对象
      socket: ''
    };
  },
  methods: {
    initTerm() {
      //初始化终端
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      });

      const socket = null;

      const attachAddon = new AttachAddon(socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      //自适应大小
      term.loadAddon(fitAddon);

      term.open(document.getElementById('xterm'));
      fitAddon.fit();
      term.focus();


      this.term = term;
    },
    initSocket() {
      //初始化websocket链接
      this.socket = new WebSocket(`ws://localhost:8999`);

      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();

    },
    socketOnClose() {
      const socket = this.socket;
      socket.onclose = () => {
        console.log('websocket关闭！');
      };
    },
    socketOnOpen() {
      const socket = this.socket;
      socket.onopen = () => {
        this.initTerm();
      };
    },
    socketOnError() {
      const socket = this.socket;
      socket.onerror = () => {
        console.log('websocket关闭！');
      };
    }

  }
};
</script>

<style>
.xterm {
  width: 100%;
  height: 100%;
}
</style>
