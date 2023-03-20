<template>
  <div id="xterm">

  </div>

</template>

<script>
// import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css';
import {Terminal} from 'xterm';

export default {
  name: 'App',
  data() {
    return {
      // 保存terminal实例
      term: ''
    };
  },
  methods: {
    initTerm() {
      //初始化终端
      const term = new Terminal();

      this.term = term;
    }

  }
};
</script>

<style>
.xterm{
  width: 100%;
  height: 100%;
}
</style>
