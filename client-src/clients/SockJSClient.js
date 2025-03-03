"use strict";

const SockJS = require("../modules/sockjs-client");
const { log } = require("../utils/log");

module.exports = class SockJSClient {
  constructor(url) {
    // SockJS requires `http` and `https` protocols
    this.sock = new SockJS(
      url.replace(/^ws:/i, "http:").replace(/^wss:/i, "https:")
    );
    this.sock.onerror = (error) => {
      log.error(error);
    };
  }

  onOpen(f) {
    this.sock.onopen = f;
  }

  onClose(f) {
    this.sock.onclose = f;
  }

  // call f with the message string as the first argument
  onMessage(f) {
    this.sock.onmessage = (e) => {
      f(e.data);
    };
  }
};
