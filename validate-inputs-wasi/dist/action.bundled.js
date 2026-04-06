"use jco";
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/@bytecodealliance/preview2-shim/lib/nodejs/cli.js
import process2, { argv, env as env2, cwd } from "node:process";

// node_modules/@bytecodealliance/preview2-shim/lib/io/worker-io.js
import { fileURLToPath } from "node:url";

// node_modules/@bytecodealliance/preview2-shim/lib/synckit/index.js
import path from "node:path";
import {
  MessageChannel,
  Worker,
  receiveMessageOnPort,
  workerData,
  parentPort
} from "node:worker_threads";
var DEFAULT_WORKER_BUFFER_SIZE = 1024;
var CALL_TIMEOUT = void 0;
function createSyncFn(workerPath2, debug, callbackHandler) {
  if (!path.isAbsolute(workerPath2)) {
    throw new Error("`workerPath` must be absolute");
  }
  const { port1: mainPort, port2: workerPort } = new MessageChannel();
  const worker = new Worker(workerPath2, {
    workerData: { workerPort, debug },
    transferList: [workerPort],
    execArgv: []
  });
  worker.on("message", ({ type, id, payload }) => {
    if (!type) {
      throw new Error(
        "Internal error: Expected a type of a worker callback"
      );
    }
    callbackHandler(type, id, payload);
  });
  let nextID = 0;
  const syncFn = (...args) => {
    const cid = nextID++;
    const sharedBuffer = new SharedArrayBuffer(DEFAULT_WORKER_BUFFER_SIZE);
    const sharedBufferView = new Int32Array(sharedBuffer);
    const msg = { sharedBuffer, cid, args };
    worker.postMessage(msg);
    const status = Atomics.wait(sharedBufferView, 0, 0, CALL_TIMEOUT);
    if (!["ok", "not-equal"].includes(status)) {
      throw new Error("Internal error: Atomics.wait() failed: " + status);
    }
    const {
      cid: cid2,
      result,
      error: error2,
      properties
    } = receiveMessageOnPort(mainPort).message;
    if (cid !== cid2) {
      throw new Error(
        `Internal error: Expected id ${cid} but got id ${cid2}`
      );
    }
    if (error2) {
      if (error2 instanceof Error) {
        throw Object.assign(error2, properties);
      }
      throw error2;
    }
    return result;
  };
  if (worker.unref) {
    worker.unref();
  }
  return syncFn;
}

// node_modules/@bytecodealliance/preview2-shim/lib/io/calls.js
var calls_exports = {};
__export(calls_exports, {
  CALL_MASK: () => CALL_MASK,
  CALL_SHIFT: () => CALL_SHIFT,
  CALL_TYPE_MASK: () => CALL_TYPE_MASK,
  CLOCKS: () => CLOCKS,
  CLOCKS_DURATION_SUBSCRIBE: () => CLOCKS_DURATION_SUBSCRIBE,
  CLOCKS_INSTANT_SUBSCRIBE: () => CLOCKS_INSTANT_SUBSCRIBE,
  FILE: () => FILE,
  FUTURE_DISPOSE: () => FUTURE_DISPOSE,
  FUTURE_SUBSCRIBE: () => FUTURE_SUBSCRIBE,
  FUTURE_TAKE_VALUE: () => FUTURE_TAKE_VALUE,
  HTTP: () => HTTP,
  HTTP_CREATE_REQUEST: () => HTTP_CREATE_REQUEST,
  HTTP_OUTGOING_BODY_DISPOSE: () => HTTP_OUTGOING_BODY_DISPOSE,
  HTTP_OUTPUT_STREAM_FINISH: () => HTTP_OUTPUT_STREAM_FINISH,
  HTTP_SERVER_CLEAR_OUTGOING_RESPONSE: () => HTTP_SERVER_CLEAR_OUTGOING_RESPONSE,
  HTTP_SERVER_GET_ADDRESS: () => HTTP_SERVER_GET_ADDRESS,
  HTTP_SERVER_INCOMING_HANDLER: () => HTTP_SERVER_INCOMING_HANDLER,
  HTTP_SERVER_SET_OUTGOING_RESPONSE: () => HTTP_SERVER_SET_OUTGOING_RESPONSE,
  HTTP_SERVER_START: () => HTTP_SERVER_START,
  HTTP_SERVER_STOP: () => HTTP_SERVER_STOP,
  INPUT_STREAM_BLOCKING_READ: () => INPUT_STREAM_BLOCKING_READ,
  INPUT_STREAM_BLOCKING_SKIP: () => INPUT_STREAM_BLOCKING_SKIP,
  INPUT_STREAM_CREATE: () => INPUT_STREAM_CREATE,
  INPUT_STREAM_DISPOSE: () => INPUT_STREAM_DISPOSE,
  INPUT_STREAM_READ: () => INPUT_STREAM_READ,
  INPUT_STREAM_SKIP: () => INPUT_STREAM_SKIP,
  INPUT_STREAM_SUBSCRIBE: () => INPUT_STREAM_SUBSCRIBE,
  OUTPUT_STREAM_BLOCKING_FLUSH: () => OUTPUT_STREAM_BLOCKING_FLUSH,
  OUTPUT_STREAM_BLOCKING_SPLICE: () => OUTPUT_STREAM_BLOCKING_SPLICE,
  OUTPUT_STREAM_BLOCKING_WRITE_AND_FLUSH: () => OUTPUT_STREAM_BLOCKING_WRITE_AND_FLUSH,
  OUTPUT_STREAM_BLOCKING_WRITE_ZEROES_AND_FLUSH: () => OUTPUT_STREAM_BLOCKING_WRITE_ZEROES_AND_FLUSH,
  OUTPUT_STREAM_CHECK_WRITE: () => OUTPUT_STREAM_CHECK_WRITE,
  OUTPUT_STREAM_CREATE: () => OUTPUT_STREAM_CREATE,
  OUTPUT_STREAM_DISPOSE: () => OUTPUT_STREAM_DISPOSE,
  OUTPUT_STREAM_FLUSH: () => OUTPUT_STREAM_FLUSH,
  OUTPUT_STREAM_GET_TOTAL_BYTES: () => OUTPUT_STREAM_GET_TOTAL_BYTES,
  OUTPUT_STREAM_SPLICE: () => OUTPUT_STREAM_SPLICE,
  OUTPUT_STREAM_SUBSCRIBE: () => OUTPUT_STREAM_SUBSCRIBE,
  OUTPUT_STREAM_WRITE: () => OUTPUT_STREAM_WRITE,
  OUTPUT_STREAM_WRITE_ZEROES: () => OUTPUT_STREAM_WRITE_ZEROES,
  POLL_POLLABLE_BLOCK: () => POLL_POLLABLE_BLOCK,
  POLL_POLLABLE_DISPOSE: () => POLL_POLLABLE_DISPOSE,
  POLL_POLLABLE_READY: () => POLL_POLLABLE_READY,
  POLL_POLL_LIST: () => POLL_POLL_LIST,
  SOCKET_DATAGRAM_STREAM_DISPOSE: () => SOCKET_DATAGRAM_STREAM_DISPOSE,
  SOCKET_DATAGRAM_STREAM_SUBSCRIBE: () => SOCKET_DATAGRAM_STREAM_SUBSCRIBE,
  SOCKET_GET_DEFAULT_RECEIVE_BUFFER_SIZE: () => SOCKET_GET_DEFAULT_RECEIVE_BUFFER_SIZE,
  SOCKET_GET_DEFAULT_SEND_BUFFER_SIZE: () => SOCKET_GET_DEFAULT_SEND_BUFFER_SIZE,
  SOCKET_INCOMING_DATAGRAM_STREAM_RECEIVE: () => SOCKET_INCOMING_DATAGRAM_STREAM_RECEIVE,
  SOCKET_OUTGOING_DATAGRAM_STREAM_CHECK_SEND: () => SOCKET_OUTGOING_DATAGRAM_STREAM_CHECK_SEND,
  SOCKET_OUTGOING_DATAGRAM_STREAM_SEND: () => SOCKET_OUTGOING_DATAGRAM_STREAM_SEND,
  SOCKET_RESOLVE_ADDRESS_CREATE_REQUEST: () => SOCKET_RESOLVE_ADDRESS_CREATE_REQUEST,
  SOCKET_RESOLVE_ADDRESS_DISPOSE_REQUEST: () => SOCKET_RESOLVE_ADDRESS_DISPOSE_REQUEST,
  SOCKET_RESOLVE_ADDRESS_SUBSCRIBE_REQUEST: () => SOCKET_RESOLVE_ADDRESS_SUBSCRIBE_REQUEST,
  SOCKET_RESOLVE_ADDRESS_TAKE_REQUEST: () => SOCKET_RESOLVE_ADDRESS_TAKE_REQUEST,
  SOCKET_TCP: () => SOCKET_TCP,
  SOCKET_TCP_ACCEPT: () => SOCKET_TCP_ACCEPT,
  SOCKET_TCP_BIND_FINISH: () => SOCKET_TCP_BIND_FINISH,
  SOCKET_TCP_BIND_START: () => SOCKET_TCP_BIND_START,
  SOCKET_TCP_CONNECT_FINISH: () => SOCKET_TCP_CONNECT_FINISH,
  SOCKET_TCP_CONNECT_START: () => SOCKET_TCP_CONNECT_START,
  SOCKET_TCP_CREATE_HANDLE: () => SOCKET_TCP_CREATE_HANDLE,
  SOCKET_TCP_DISPOSE: () => SOCKET_TCP_DISPOSE,
  SOCKET_TCP_GET_LOCAL_ADDRESS: () => SOCKET_TCP_GET_LOCAL_ADDRESS,
  SOCKET_TCP_GET_REMOTE_ADDRESS: () => SOCKET_TCP_GET_REMOTE_ADDRESS,
  SOCKET_TCP_IS_LISTENING: () => SOCKET_TCP_IS_LISTENING,
  SOCKET_TCP_LISTEN_FINISH: () => SOCKET_TCP_LISTEN_FINISH,
  SOCKET_TCP_LISTEN_START: () => SOCKET_TCP_LISTEN_START,
  SOCKET_TCP_SET_KEEP_ALIVE: () => SOCKET_TCP_SET_KEEP_ALIVE,
  SOCKET_TCP_SET_LISTEN_BACKLOG_SIZE: () => SOCKET_TCP_SET_LISTEN_BACKLOG_SIZE,
  SOCKET_TCP_SHUTDOWN: () => SOCKET_TCP_SHUTDOWN,
  SOCKET_TCP_SUBSCRIBE: () => SOCKET_TCP_SUBSCRIBE,
  SOCKET_UDP: () => SOCKET_UDP,
  SOCKET_UDP_BIND_FINISH: () => SOCKET_UDP_BIND_FINISH,
  SOCKET_UDP_BIND_START: () => SOCKET_UDP_BIND_START,
  SOCKET_UDP_CREATE_HANDLE: () => SOCKET_UDP_CREATE_HANDLE,
  SOCKET_UDP_DISPOSE: () => SOCKET_UDP_DISPOSE,
  SOCKET_UDP_GET_LOCAL_ADDRESS: () => SOCKET_UDP_GET_LOCAL_ADDRESS,
  SOCKET_UDP_GET_RECEIVE_BUFFER_SIZE: () => SOCKET_UDP_GET_RECEIVE_BUFFER_SIZE,
  SOCKET_UDP_GET_REMOTE_ADDRESS: () => SOCKET_UDP_GET_REMOTE_ADDRESS,
  SOCKET_UDP_GET_SEND_BUFFER_SIZE: () => SOCKET_UDP_GET_SEND_BUFFER_SIZE,
  SOCKET_UDP_GET_UNICAST_HOP_LIMIT: () => SOCKET_UDP_GET_UNICAST_HOP_LIMIT,
  SOCKET_UDP_SET_RECEIVE_BUFFER_SIZE: () => SOCKET_UDP_SET_RECEIVE_BUFFER_SIZE,
  SOCKET_UDP_SET_SEND_BUFFER_SIZE: () => SOCKET_UDP_SET_SEND_BUFFER_SIZE,
  SOCKET_UDP_SET_UNICAST_HOP_LIMIT: () => SOCKET_UDP_SET_UNICAST_HOP_LIMIT,
  SOCKET_UDP_STREAM: () => SOCKET_UDP_STREAM,
  SOCKET_UDP_SUBSCRIBE: () => SOCKET_UDP_SUBSCRIBE,
  STDERR: () => STDERR,
  STDIN: () => STDIN,
  STDOUT: () => STDOUT,
  reverseMap: () => reverseMap
});
var call_id = 0;
var CALL_MASK = 4278190080;
var CALL_TYPE_MASK = 16777215;
var CALL_SHIFT = 24;
var cnt = 0;
var STDIN = ++cnt;
var STDOUT = ++cnt;
var STDERR = ++cnt;
var FILE = ++cnt;
var HTTP = ++cnt;
var SOCKET_TCP = ++cnt;
var SOCKET_UDP = ++cnt;
var CLOCKS = ++cnt;
var INPUT_STREAM_CREATE = ++call_id << CALL_SHIFT;
var INPUT_STREAM_READ = ++call_id << CALL_SHIFT;
var INPUT_STREAM_BLOCKING_READ = ++call_id << CALL_SHIFT;
var INPUT_STREAM_SKIP = ++call_id << CALL_SHIFT;
var INPUT_STREAM_BLOCKING_SKIP = ++call_id << CALL_SHIFT;
var INPUT_STREAM_SUBSCRIBE = ++call_id << CALL_SHIFT;
var INPUT_STREAM_DISPOSE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_CREATE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_CHECK_WRITE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_WRITE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_BLOCKING_WRITE_AND_FLUSH = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_FLUSH = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_BLOCKING_FLUSH = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_WRITE_ZEROES = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_BLOCKING_WRITE_ZEROES_AND_FLUSH = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_SPLICE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_BLOCKING_SPLICE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_SUBSCRIBE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_DISPOSE = ++call_id << CALL_SHIFT;
var OUTPUT_STREAM_GET_TOTAL_BYTES = ++call_id << CALL_SHIFT;
var POLL_POLLABLE_READY = ++call_id << CALL_SHIFT;
var POLL_POLLABLE_BLOCK = ++call_id << CALL_SHIFT;
var POLL_POLLABLE_DISPOSE = ++call_id << CALL_SHIFT;
var POLL_POLL_LIST = ++call_id << CALL_SHIFT;
var FUTURE_DISPOSE = ++call_id << CALL_SHIFT;
var FUTURE_TAKE_VALUE = ++call_id << CALL_SHIFT;
var FUTURE_SUBSCRIBE = ++call_id << CALL_SHIFT;
var HTTP_CREATE_REQUEST = ++call_id << 24;
var HTTP_OUTPUT_STREAM_FINISH = ++call_id << CALL_SHIFT;
var HTTP_SERVER_START = ++call_id << CALL_SHIFT;
var HTTP_SERVER_STOP = ++call_id << CALL_SHIFT;
var HTTP_SERVER_INCOMING_HANDLER = ++call_id << CALL_SHIFT;
var HTTP_SERVER_SET_OUTGOING_RESPONSE = ++call_id << CALL_SHIFT;
var HTTP_SERVER_CLEAR_OUTGOING_RESPONSE = ++call_id << CALL_SHIFT;
var HTTP_SERVER_GET_ADDRESS = ++call_id << CALL_SHIFT;
var HTTP_OUTGOING_BODY_DISPOSE = ++call_id << CALL_SHIFT;
var CLOCKS_DURATION_SUBSCRIBE = ++call_id << CALL_SHIFT;
var CLOCKS_INSTANT_SUBSCRIBE = ++call_id << CALL_SHIFT;
var SOCKET_TCP_CREATE_HANDLE = ++call_id << CALL_SHIFT;
var SOCKET_TCP_BIND_START = ++call_id << CALL_SHIFT;
var SOCKET_TCP_BIND_FINISH = ++call_id << CALL_SHIFT;
var SOCKET_TCP_CONNECT_START = ++call_id << CALL_SHIFT;
var SOCKET_TCP_CONNECT_FINISH = ++call_id << CALL_SHIFT;
var SOCKET_TCP_SUBSCRIBE = ++call_id << CALL_SHIFT;
var SOCKET_TCP_LISTEN_START = ++call_id << CALL_SHIFT;
var SOCKET_TCP_LISTEN_FINISH = ++call_id << CALL_SHIFT;
var SOCKET_TCP_IS_LISTENING = ++call_id << CALL_SHIFT;
var SOCKET_TCP_ACCEPT = ++call_id << CALL_SHIFT;
var SOCKET_TCP_GET_LOCAL_ADDRESS = ++call_id << CALL_SHIFT;
var SOCKET_TCP_GET_REMOTE_ADDRESS = ++call_id << CALL_SHIFT;
var SOCKET_TCP_SET_KEEP_ALIVE = ++call_id << CALL_SHIFT;
var SOCKET_TCP_SET_LISTEN_BACKLOG_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_TCP_SHUTDOWN = ++call_id << CALL_SHIFT;
var SOCKET_TCP_DISPOSE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_CREATE_HANDLE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_BIND_START = ++call_id << CALL_SHIFT;
var SOCKET_UDP_BIND_FINISH = ++call_id << CALL_SHIFT;
var SOCKET_UDP_STREAM = ++call_id << CALL_SHIFT;
var SOCKET_UDP_SUBSCRIBE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_DISPOSE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_GET_LOCAL_ADDRESS = ++call_id << CALL_SHIFT;
var SOCKET_UDP_GET_RECEIVE_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_GET_REMOTE_ADDRESS = ++call_id << CALL_SHIFT;
var SOCKET_UDP_GET_SEND_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_GET_UNICAST_HOP_LIMIT = ++call_id << CALL_SHIFT;
var SOCKET_UDP_SET_RECEIVE_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_SET_SEND_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_UDP_SET_UNICAST_HOP_LIMIT = ++call_id << CALL_SHIFT;
var SOCKET_INCOMING_DATAGRAM_STREAM_RECEIVE = ++call_id << CALL_SHIFT;
var SOCKET_OUTGOING_DATAGRAM_STREAM_CHECK_SEND = ++call_id << CALL_SHIFT;
var SOCKET_OUTGOING_DATAGRAM_STREAM_SEND = ++call_id << CALL_SHIFT;
var SOCKET_DATAGRAM_STREAM_SUBSCRIBE = ++call_id << CALL_SHIFT;
var SOCKET_DATAGRAM_STREAM_DISPOSE = ++call_id << CALL_SHIFT;
var SOCKET_GET_DEFAULT_SEND_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_GET_DEFAULT_RECEIVE_BUFFER_SIZE = ++call_id << CALL_SHIFT;
var SOCKET_RESOLVE_ADDRESS_CREATE_REQUEST = ++call_id << CALL_SHIFT;
var SOCKET_RESOLVE_ADDRESS_TAKE_REQUEST = ++call_id << CALL_SHIFT;
var SOCKET_RESOLVE_ADDRESS_SUBSCRIBE_REQUEST = ++call_id << CALL_SHIFT;
var SOCKET_RESOLVE_ADDRESS_DISPOSE_REQUEST = ++call_id << CALL_SHIFT;
var reverseMap = {};
for (const name of Object.getOwnPropertyNames(calls_exports)) {
  if (name === "reverseMap") {
    continue;
  }
  reverseMap[calls_exports[name]] = name;
}

// node_modules/@bytecodealliance/preview2-shim/lib/io/worker-io.js
import nodeProcess, { exit, stderr, stdout, env } from "node:process";
var _rawDebug = nodeProcess._rawDebug || console.error.bind(console);
var workerPath = fileURLToPath(
  new URL("./worker-thread.js", import.meta.url)
);
var httpIncomingHandlers = /* @__PURE__ */ new Map();
var instanceId = Math.round(Math.random() * 1e3).toString();
var DEBUG_DEFAULT = false;
var DEBUG = env.PREVIEW2_SHIM_DEBUG === "0" ? false : env.PREVIEW2_SHIM_DEBUG === "1" ? true : DEBUG_DEFAULT;
var ioCall = createSyncFn(workerPath, DEBUG, (type, id, payload) => {
  if (type !== HTTP_SERVER_INCOMING_HANDLER) {
    throw new Error(
      "Internal error: only incoming handler callback is permitted"
    );
  }
  const handler = httpIncomingHandlers.get(id);
  if (!handler) {
    throw new Error(
      `Internal error: no incoming handler registered for server ${id}`
    );
  }
  handler(payload);
});
if (DEBUG) {
  const _ioCall = ioCall;
  ioCall = function ioCall2(num, id, payload) {
    if (typeof id !== "number" && id !== null) {
      throw new Error("id must be a number or null");
    }
    let ret;
    try {
      _rawDebug(
        instanceId,
        reverseMap[num & CALL_MASK],
        reverseMap[num & CALL_TYPE_MASK],
        id,
        payload
      );
      ret = _ioCall(num, id, payload);
      return ret;
    } catch (e) {
      ret = e;
      throw ret;
    } finally {
      _rawDebug(instanceId, "->", ret);
    }
  };
}
var symbolDispose = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var finalizationRegistry = new FinalizationRegistry(
  (dispose) => void dispose()
);
var dummySymbol = /* @__PURE__ */ Symbol();
function registerDispose(resource, parentResource, id, disposeFn) {
  function finalizer() {
    if (parentResource?.[dummySymbol]) {
      return;
    }
    disposeFn(id);
  }
  finalizationRegistry.register(resource, finalizer, finalizer);
  return finalizer;
}
function earlyDispose(finalizer) {
  finalizationRegistry.unregister(finalizer);
  finalizer();
}
var _Error = Error;
var IoError = class Error2 extends _Error {
  constructor(payload) {
    super(payload);
    this.payload = payload;
  }
  toDebugString() {
    return this.message;
  }
};
function streamIoErrorCall(call, id, payload) {
  try {
    return ioCall(call, id, payload);
  } catch (e) {
    if (e.tag === "closed") {
      throw e;
    }
    if (e.tag === "last-operation-failed") {
      e.val = new IoError(Object.assign(new Error(e.val.message), e.val));
      throw e;
    }
    console.trace(e);
    exit(1);
  }
}
var InputStream = class _InputStream {
  #id;
  #streamType;
  #finalizer;
  read(len2) {
    return streamIoErrorCall(
      INPUT_STREAM_READ | this.#streamType,
      this.#id,
      len2
    );
  }
  blockingRead(len2) {
    return streamIoErrorCall(
      INPUT_STREAM_BLOCKING_READ | this.#streamType,
      this.#id,
      len2
    );
  }
  skip(len2) {
    return streamIoErrorCall(
      INPUT_STREAM_SKIP | this.#streamType,
      this.#id,
      len2
    );
  }
  blockingSkip(len2) {
    return streamIoErrorCall(
      INPUT_STREAM_BLOCKING_SKIP | this.#streamType,
      this.#id,
      len2
    );
  }
  subscribe() {
    return pollableCreate(
      ioCall(INPUT_STREAM_SUBSCRIBE | this.#streamType, this.#id),
      this
    );
  }
  static _id(stream) {
    return stream.#id;
  }
  /**
   * @param {FILE | SOCKET_TCP | STDIN | HTTP} streamType
   */
  static _create(streamType, id) {
    const stream = new _InputStream();
    stream.#id = id;
    stream.#streamType = streamType;
    let disposeFn;
    switch (streamType) {
      case FILE:
        disposeFn = fileInputStreamDispose;
        break;
      case SOCKET_TCP:
        disposeFn = socketTcpInputStreamDispose;
        break;
      case STDIN:
        disposeFn = stdinInputStreamDispose;
        break;
      case HTTP:
        disposeFn = httpInputStreamDispose;
        break;
      default:
        throw new Error(
          "wasi-io trap: Dispose function not created for stream type " + reverseMap[streamType]
        );
    }
    stream.#finalizer = registerDispose(stream, null, id, disposeFn);
    return stream;
  }
  [symbolDispose]() {
    if (this.#finalizer) {
      earlyDispose(this.#finalizer);
      this.#finalizer = null;
    }
  }
};
function fileInputStreamDispose(id) {
  ioCall(INPUT_STREAM_DISPOSE | FILE, id, null);
}
function socketTcpInputStreamDispose(id) {
  ioCall(INPUT_STREAM_DISPOSE | SOCKET_TCP, id, null);
}
function stdinInputStreamDispose(id) {
  ioCall(INPUT_STREAM_DISPOSE | STDIN, id, null);
}
function httpInputStreamDispose(id) {
  ioCall(INPUT_STREAM_DISPOSE | HTTP, id, null);
}
var inputStreamCreate = InputStream._create;
delete InputStream._create;
var inputStreamId = InputStream._id;
delete InputStream._id;
var OutputStream = class _OutputStream {
  #id;
  #streamType;
  #finalizer;
  checkWrite(len2) {
    return streamIoErrorCall(
      OUTPUT_STREAM_CHECK_WRITE | this.#streamType,
      this.#id,
      len2
    );
  }
  write(buf) {
    if (this.#streamType <= STDERR) {
      return this.blockingWriteAndFlush(buf);
    }
    return streamIoErrorCall(
      OUTPUT_STREAM_WRITE | this.#streamType,
      this.#id,
      buf
    );
  }
  blockingWriteAndFlush(buf) {
    if (this.#streamType <= STDERR) {
      const stream = this.#streamType === STDERR ? stderr : stdout;
      return void stream.write(buf);
    }
    return streamIoErrorCall(
      OUTPUT_STREAM_BLOCKING_WRITE_AND_FLUSH | this.#streamType,
      this.#id,
      buf
    );
  }
  flush() {
    return streamIoErrorCall(
      OUTPUT_STREAM_FLUSH | this.#streamType,
      this.#id
    );
  }
  blockingFlush() {
    return streamIoErrorCall(
      OUTPUT_STREAM_BLOCKING_FLUSH | this.#streamType,
      this.#id
    );
  }
  writeZeroes(len2) {
    return streamIoErrorCall(
      OUTPUT_STREAM_WRITE_ZEROES | this.#streamType,
      this.#id,
      len2
    );
  }
  blockingWriteZeroesAndFlush(len2) {
    return streamIoErrorCall(
      OUTPUT_STREAM_BLOCKING_WRITE_ZEROES_AND_FLUSH | this.#streamType,
      this.#id,
      len2
    );
  }
  splice(src, len2) {
    return streamIoErrorCall(
      OUTPUT_STREAM_SPLICE | this.#streamType,
      this.#id,
      { src: src.#id, len: len2 }
    );
  }
  blockingSplice(src, len2) {
    return streamIoErrorCall(
      OUTPUT_STREAM_BLOCKING_SPLICE | this.#streamType,
      this.#id,
      { src: inputStreamId(src), len: len2 }
    );
  }
  subscribe() {
    return pollableCreate(
      ioCall(OUTPUT_STREAM_SUBSCRIBE | this.#streamType, this.#id)
    );
  }
  static _id(outputStream) {
    return outputStream.#id;
  }
  /**
   * @param {OutputStreamType} streamType
   * @param {any} createPayload
   */
  static _create(streamType, id) {
    const stream = new _OutputStream();
    stream.#id = id;
    stream.#streamType = streamType;
    let disposeFn;
    switch (streamType) {
      case STDOUT:
        disposeFn = stdoutOutputStreamDispose;
        break;
      case STDERR:
        disposeFn = stderrOutputStreamDispose;
        break;
      case SOCKET_TCP:
        disposeFn = socketTcpOutputStreamDispose;
        break;
      case FILE:
        disposeFn = fileOutputStreamDispose;
        break;
      case HTTP:
        return stream;
      default:
        throw new Error(
          "wasi-io trap: Dispose function not created for stream type " + reverseMap[streamType]
        );
    }
    stream.#finalizer = registerDispose(stream, null, id, disposeFn);
    return stream;
  }
  [symbolDispose]() {
    if (this.#finalizer) {
      earlyDispose(this.#finalizer);
      this.#finalizer = null;
    }
  }
};
function stdoutOutputStreamDispose(id) {
  ioCall(OUTPUT_STREAM_DISPOSE | STDOUT, id);
}
function stderrOutputStreamDispose(id) {
  ioCall(OUTPUT_STREAM_DISPOSE | STDERR, id);
}
function socketTcpOutputStreamDispose(id) {
  ioCall(OUTPUT_STREAM_DISPOSE | SOCKET_TCP, id);
}
function fileOutputStreamDispose(id) {
  ioCall(OUTPUT_STREAM_DISPOSE | FILE, id);
}
var outputStreamCreate = OutputStream._create;
delete OutputStream._create;
var outputStreamId = OutputStream._id;
delete OutputStream._id;
var error = { Error: IoError };
var streams = { InputStream, OutputStream };
function pollableDispose(id) {
  ioCall(POLL_POLLABLE_DISPOSE, id);
}
var rep2 = /* @__PURE__ */ Symbol.for("cabiRep");
var Pollable = class _Pollable {
  #finalizer;
  ready() {
    return ioCall(POLL_POLLABLE_READY, this[rep2]);
  }
  block() {
    ioCall(POLL_POLLABLE_BLOCK, this[rep2]);
  }
  static _create(id, parent) {
    const pollable = new _Pollable();
    pollable[rep2] = id;
    pollable.#finalizer = registerDispose(
      pollable,
      parent,
      id,
      pollableDispose
    );
    return pollable;
  }
  [symbolDispose]() {
    if (this.#finalizer && this[rep2]) {
      earlyDispose(this.#finalizer);
      this.#finalizer = null;
    }
  }
};
var cabiLowerSymbol = /* @__PURE__ */ Symbol.for("cabiLower");
var T_FLAG = 1 << 30;
Pollable.prototype.ready[cabiLowerSymbol] = function({
  resourceTables: [table]
}) {
  return function pollableReady(handle) {
    const rep3 = table[(handle << 1) + 1] & ~T_FLAG;
    const ready = ioCall(POLL_POLLABLE_READY, rep3);
    return ready ? 1 : 0;
  };
};
Pollable.prototype.block[cabiLowerSymbol] = function({
  resourceTables: [table]
}) {
  return function pollableBlock(handle) {
    const rep3 = table[(handle << 1) + 1] & ~T_FLAG;
    ioCall(POLL_POLLABLE_BLOCK, rep3);
  };
};
Pollable[/* @__PURE__ */ Symbol.for("cabiDispose")] = function pollableDispose2(rep3) {
  ioCall(POLL_POLLABLE_DISPOSE, rep3);
};
var pollableCreate = Pollable._create;
delete Pollable._create;
var poll = {
  Pollable,
  poll(list) {
    return ioCall(
      POLL_POLL_LIST,
      null,
      list.map((pollable) => pollable[rep2])
    );
  }
};
poll.poll[cabiLowerSymbol] = function({
  memory: memory2,
  realloc,
  resourceTables: [table]
}) {
  return function pollPollList(listPtr, len2, retptr) {
    const handleList = new Uint32Array(memory2.buffer, listPtr, len2);
    const repList = Array(len2);
    for (let i = 0; i < len2; i++) {
      const handle = handleList[i];
      repList[i] = table[(handle << 1) + 1] & ~T_FLAG;
    }
    const result = ioCall(POLL_POLL_LIST, null, repList);
    const ptr = realloc(0, 0, 4, result.byteLength);
    const out = new Uint32Array(memory2.buffer, ptr, result.length);
    out.set(result);
    const ret = new Uint32Array(memory2.buffer, retptr, 2);
    ret[0] = ptr;
    ret[1] = result.length;
    return retptr;
  };
};
function createPoll(call, id, initPayload) {
  return pollableCreate(ioCall(call, id, initPayload));
}

// node_modules/@bytecodealliance/preview2-shim/lib/nodejs/cli.js
var { InputStream: InputStream2, OutputStream: OutputStream2 } = streams;
var _env = Object.entries(env2);
var _args = argv.slice(1);
var _cwd = cwd();
var environment = {
  getEnvironment() {
    return _env;
  },
  getArguments() {
    return _args;
  },
  initialCwd() {
    return _cwd;
  }
};
var exit2 = {
  exit(status) {
    process2.exit(status.tag === "err" ? 1 : 0);
  },
  exitWithCode(code) {
    process2.exit(code);
  }
};
var stdinStream;
var stdoutStream = outputStreamCreate(STDOUT, 1);
var stderrStream = outputStreamCreate(STDERR, 2);
var stdin = {
  InputStream: InputStream2,
  getStdin() {
    if (!stdinStream) {
      stdinStream = inputStreamCreate(
        STDIN,
        ioCall(INPUT_STREAM_CREATE | STDIN, null, null)
      );
    }
    return stdinStream;
  }
};
var stdout2 = {
  OutputStream: OutputStream2,
  getStdout() {
    return stdoutStream;
  }
};
var stderr2 = {
  OutputStream: OutputStream2,
  getStderr() {
    return stderrStream;
  }
};
var TerminalInput = class {
};
var TerminalOutput = class {
};
var terminalStdoutInstance = new TerminalOutput();
var terminalStderrInstance = new TerminalOutput();
var terminalStdinInstance = new TerminalInput();

// node_modules/@bytecodealliance/preview2-shim/lib/nodejs/clocks.js
import { hrtime } from "node:process";
var symbolCabiLower = /* @__PURE__ */ Symbol.for("cabiLower");
function resolution() {
  return 1n;
}
var monotonicClock = {
  resolution,
  now() {
    return hrtime.bigint();
  },
  subscribeInstant(instant) {
    return createPoll(CLOCKS_INSTANT_SUBSCRIBE, null, instant);
  },
  subscribeDuration(duration) {
    duration = BigInt(duration);
    return createPoll(CLOCKS_DURATION_SUBSCRIBE, null, duration);
  }
};
var wallClock = {
  resolution() {
    return { seconds: 0n, nanoseconds: 1e6 };
  },
  now() {
    const seconds = BigInt(Math.floor(Date.now() / 1e3));
    const nanoseconds = Date.now() % 1e3 * 1e6;
    return { seconds, nanoseconds };
  }
};
monotonicClock.resolution[symbolCabiLower] = () => resolution;
monotonicClock.now[symbolCabiLower] = () => hrtime.bigint;
wallClock.resolution[symbolCabiLower] = ({ memory: memory2 }) => {
  let buf32 = new Int32Array(memory2.buffer);
  return function now2(retptr) {
    if (memory2.buffer !== buf32.buffer) {
      buf32 = new Int32Array(memory2.buffer);
    }
    if (retptr % 4) {
      throw new Error("wasi-io trap: retptr not aligned");
    }
    buf32[(retptr >> 2) + 0] = 0;
    buf32[(retptr >> 2) + 4] = 0;
    buf32[(retptr >> 2) + 8] = 1e6;
  };
};
wallClock.now[symbolCabiLower] = ({ memory: memory2 }) => {
  let buf32 = new Int32Array(memory2.buffer);
  let buf64 = new BigInt64Array(memory2.buffer);
  return function now2(retptr) {
    if (memory2.buffer !== buf32.buffer) {
      buf32 = new Int32Array(memory2.buffer);
      buf64 = new BigInt64Array(memory2.buffer);
    }
    if (retptr % 4) {
      throw new Error("wasi-io trap: retptr not aligned");
    }
    buf64[(retptr >> 2) + 0] = BigInt(Math.floor(Date.now() / 1e3));
    buf32[(retptr >> 2) + 8] = Date.now() % 1e3 * 1e6;
  };
};

// node_modules/@bytecodealliance/preview2-shim/lib/nodejs/filesystem.js
import nodeFs, {
  closeSync,
  constants,
  fdatasyncSync,
  fstatSync,
  fsyncSync,
  ftruncateSync,
  futimesSync,
  linkSync,
  lstatSync,
  mkdirSync,
  opendirSync,
  openSync,
  readlinkSync,
  readSync,
  renameSync,
  rmdirSync,
  statSync,
  symlinkSync,
  unlinkSync,
  utimesSync,
  writeSync
} from "node:fs";
import { platform } from "node:process";
var lutimesSync = nodeFs.lutimesSync;
var symbolDispose2 = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var isWindows = platform === "win32";
var isMac = platform === "darwin";
var nsMagnitude = 1000000000000n;
function nsToDateTime(ns) {
  const seconds = ns / nsMagnitude;
  const nanoseconds = Number(ns % nsMagnitude);
  return { seconds, nanoseconds };
}
function lookupType(obj) {
  if (obj.isFile()) {
    return "regular-file";
  } else if (obj.isSocket()) {
    return "socket";
  } else if (obj.isSymbolicLink()) {
    return "symbolic-link";
  } else if (obj.isFIFO()) {
    return "fifo";
  } else if (obj.isDirectory()) {
    return "directory";
  } else if (obj.isCharacterDevice()) {
    return "character-device";
  } else if (obj.isBlockDevice()) {
    return "block-device";
  }
  return "unknown";
}
var Descriptor = class _Descriptor {
  #hostPreopen;
  #fd;
  #finalizer;
  #mode;
  #fullPath;
  static _createPreopen(hostPreopen) {
    const descriptor = new _Descriptor();
    descriptor.#hostPreopen = hostPreopen.endsWith("/") ? hostPreopen.slice(0, -1) || "/" : hostPreopen;
    if (isWindows) {
      descriptor.#hostPreopen = descriptor.#hostPreopen.replace(
        /\\/g,
        "/"
      );
      if (descriptor.#hostPreopen === "/") {
        descriptor.#hostPreopen = "//";
      }
    }
    return descriptor;
  }
  static _create(fd, mode, fullPath) {
    const descriptor = new _Descriptor();
    descriptor.#fd = fd;
    descriptor.#finalizer = registerDispose(
      descriptor,
      null,
      fd,
      closeSync
    );
    descriptor.#mode = mode;
    descriptor.#fullPath = fullPath;
    return descriptor;
  }
  [symbolDispose2]() {
    if (this.#finalizer) {
      earlyDispose(this.#finalizer);
      this.#finalizer = null;
    }
  }
  readViaStream(offset) {
    if (this.#hostPreopen) {
      throw "is-directory";
    }
    return inputStreamCreate(
      FILE,
      ioCall(INPUT_STREAM_CREATE | FILE, null, {
        fd: this.#fd,
        offset
      })
    );
  }
  writeViaStream(offset) {
    if (this.#hostPreopen) {
      throw "is-directory";
    }
    return outputStreamCreate(
      FILE,
      ioCall(OUTPUT_STREAM_CREATE | FILE, null, { fd: this.#fd, offset })
    );
  }
  appendViaStream() {
    return this.writeViaStream(this.stat().size);
  }
  advise(_offset, _length, _advice) {
    if (this.getType() === "directory") {
      throw "bad-descriptor";
    }
  }
  syncData() {
    if (this.#hostPreopen) {
      throw "invalid";
    }
    try {
      fdatasyncSync(this.#fd);
    } catch (e) {
      if (e.code === "EPERM") {
        return;
      }
      throw convertFsError(e);
    }
  }
  getFlags() {
    return this.#mode;
  }
  getType() {
    if (this.#hostPreopen) {
      return "directory";
    }
    const stats = fstatSync(this.#fd);
    return lookupType(stats);
  }
  setSize(size2) {
    if (this.#hostPreopen) {
      throw "is-directory";
    }
    try {
      ftruncateSync(this.#fd, Number(size2));
    } catch (e) {
      if (isWindows && e.code === "EPERM") {
        throw "access";
      }
      throw convertFsError(e);
    }
  }
  setTimes(dataAccessTimestamp, dataModificationTimestamp) {
    if (this.#hostPreopen) {
      throw "invalid";
    }
    let stats;
    if (dataAccessTimestamp.tag === "no-change" || dataModificationTimestamp.tag === "no-change") {
      stats = this.stat();
    }
    const atime = this.#getNewTimestamp(
      dataAccessTimestamp,
      dataAccessTimestamp.tag === "no-change" && stats.dataAccessTimestamp
    );
    const mtime = this.#getNewTimestamp(
      dataModificationTimestamp,
      dataModificationTimestamp.tag === "no-change" && stats.dataModificationTimestamp
    );
    try {
      futimesSync(this.#fd, atime, mtime);
    } catch (e) {
      throw convertFsError(e);
    }
  }
  #getNewTimestamp(newTimestamp, maybeNow) {
    switch (newTimestamp.tag) {
      case "no-change":
        return timestampToMs(maybeNow);
      case "now":
        return Math.floor(Date.now() / 1e3);
      case "timestamp":
        return timestampToMs(newTimestamp.val);
    }
  }
  read(length, offset) {
    if (!this.#fullPath) {
      throw "bad-descriptor";
    }
    const buf = new Uint8Array(Number(length));
    const bytesRead = readSync(
      this.#fd,
      buf,
      0,
      Number(length),
      Number(offset)
    );
    const out = new Uint8Array(buf.buffer, 0, bytesRead);
    return [out, bytesRead === 0 ? "ended" : "open"];
  }
  write(buffer, offset) {
    if (!this.#fullPath) {
      throw "bad-descriptor";
    }
    return BigInt(
      writeSync(this.#fd, buffer, 0, buffer.byteLength, Number(offset))
    );
  }
  readDirectory() {
    if (!this.#fullPath) {
      throw "bad-descriptor";
    }
    try {
      const dir = opendirSync(this.#fullPath);
      return directoryEntryStreamCreate(dir);
    } catch (e) {
      throw convertFsError(e);
    }
  }
  sync() {
    if (this.#hostPreopen) {
      throw "invalid";
    }
    try {
      fsyncSync(this.#fd);
    } catch (e) {
      if (e.code === "EPERM") {
        return;
      }
      throw convertFsError(e);
    }
  }
  createDirectoryAt(path2) {
    const fullPath = this.#getFullPath(path2);
    try {
      mkdirSync(fullPath);
    } catch (e) {
      throw convertFsError(e);
    }
  }
  stat() {
    if (this.#hostPreopen) {
      throw "invalid";
    }
    let stats;
    try {
      stats = fstatSync(this.#fd, { bigint: true });
    } catch (e) {
      throw convertFsError(e);
    }
    const type = lookupType(stats);
    return {
      type,
      linkCount: stats.nlink,
      size: stats.size,
      dataAccessTimestamp: nsToDateTime(stats.atimeNs),
      dataModificationTimestamp: nsToDateTime(stats.mtimeNs),
      statusChangeTimestamp: nsToDateTime(stats.ctimeNs)
    };
  }
  statAt(pathFlags, path2) {
    const fullPath = this.#getFullPath(path2, false);
    let stats;
    try {
      stats = (pathFlags.symlinkFollow ? statSync : lstatSync)(fullPath, {
        bigint: true
      });
    } catch (e) {
      throw convertFsError(e);
    }
    const type = lookupType(stats);
    return {
      type,
      linkCount: stats.nlink,
      size: stats.size,
      dataAccessTimestamp: nsToDateTime(stats.atimeNs),
      dataModificationTimestamp: nsToDateTime(stats.mtimeNs),
      statusChangeTimestamp: nsToDateTime(stats.ctimeNs)
    };
  }
  setTimesAt(pathFlags, path2, dataAccessTimestamp, dataModificationTimestamp) {
    const fullPath = this.#getFullPath(path2, false);
    let stats;
    if (dataAccessTimestamp.tag === "no-change" || dataModificationTimestamp.tag === "no-change") {
      stats = this.stat();
    }
    const atime = this.#getNewTimestamp(
      dataAccessTimestamp,
      dataAccessTimestamp.tag === "no-change" && stats.dataAccessTimestamp
    );
    const mtime = this.#getNewTimestamp(
      dataModificationTimestamp,
      dataModificationTimestamp.tag === "no-change" && stats.dataModificationTimestamp
    );
    if (!pathFlags.symlinkFollow && !lutimesSync) {
      throw new Error(
        "Changing the timestamps of symlinks isn't supported"
      );
    }
    try {
      (pathFlags.symlinkFollow ? utimesSync : lutimesSync)(
        fullPath,
        atime,
        mtime
      );
    } catch (e) {
      throw convertFsError(e);
    }
  }
  linkAt(oldPathFlags, oldPath, newDescriptor, newPath) {
    const oldFullPath = this.#getFullPath(
      oldPath,
      oldPathFlags.symlinkFollow
    );
    const newFullPath = newDescriptor.#getFullPath(newPath, false);
    if (isWindows && newFullPath.endsWith("/")) {
      throw "no-entry";
    }
    try {
      linkSync(oldFullPath, newFullPath);
    } catch (e) {
      throw convertFsError(e);
    }
  }
  openAt(pathFlags, path2, openFlags, descriptorFlags) {
    if (preopenEntries.length === 0) {
      throw "access";
    }
    const fullPath = this.#getFullPath(path2, pathFlags.symlinkFollow);
    let fsOpenFlags = 0;
    if (openFlags.create) {
      fsOpenFlags |= constants.O_CREAT;
    }
    if (openFlags.directory) {
      fsOpenFlags |= constants.O_DIRECTORY;
    }
    if (openFlags.exclusive) {
      fsOpenFlags |= constants.O_EXCL;
    }
    if (openFlags.truncate) {
      fsOpenFlags |= constants.O_TRUNC;
    }
    if (descriptorFlags.read && descriptorFlags.write) {
      fsOpenFlags |= constants.O_RDWR;
    } else if (descriptorFlags.write) {
      fsOpenFlags |= constants.O_WRONLY;
    } else if (descriptorFlags.read) {
      fsOpenFlags |= constants.O_RDONLY;
    }
    if (descriptorFlags.fileIntegritySync) {
      fsOpenFlags |= constants.O_SYNC;
    }
    if (descriptorFlags.dataIntegritySync) {
      fsOpenFlags |= constants.O_DSYNC;
    }
    if (!pathFlags.symlinkFollow) {
      fsOpenFlags |= constants.O_NOFOLLOW;
    }
    if (descriptorFlags.requestedWriteSync || descriptorFlags.mutateDirectory) {
      throw "unsupported";
    }
    if (descriptorFlags.fileIntegritySync || descriptorFlags.dataIntegritySync) {
      throw "unsupported";
    }
    if (isWindows) {
      if (!pathFlags.symlinkFollow && !openFlags.create) {
        let isSymlink = false;
        try {
          isSymlink = lstatSync(fullPath).isSymbolicLink();
        } catch {
        }
        if (isSymlink) {
          throw openFlags.directory ? "not-directory" : "loop";
        }
      }
      if (pathFlags.symlinkFollow && openFlags.directory) {
        let isFile = false;
        try {
          isFile = !statSync(fullPath).isDirectory();
        } catch {
        }
        if (isFile) {
          throw "not-directory";
        }
      }
    }
    try {
      const fd = openSync(
        fullPath.endsWith("/") ? fullPath.slice(0, -1) : fullPath,
        fsOpenFlags
      );
      const descriptor = descriptorCreate(
        fd,
        descriptorFlags,
        fullPath,
        preopenEntries
      );
      if (fullPath.endsWith("/") && descriptor.getType() !== "directory") {
        descriptor[symbolDispose2]();
        throw "not-directory";
      }
      return descriptor;
    } catch (e) {
      if (e.code === "ERR_INVALID_ARG_VALUE") {
        throw isWindows ? "no-entry" : "invalid";
      }
      throw convertFsError(e);
    }
  }
  readlinkAt(path2) {
    const fullPath = this.#getFullPath(path2, false);
    try {
      return readlinkSync(fullPath);
    } catch (e) {
      throw convertFsError(e);
    }
  }
  removeDirectoryAt(path2) {
    const fullPath = this.#getFullPath(path2, false);
    try {
      rmdirSync(fullPath);
    } catch (e) {
      if (isWindows && e.code === "ENOENT") {
        throw "not-directory";
      }
      throw convertFsError(e);
    }
  }
  renameAt(oldPath, newDescriptor, newPath) {
    const oldFullPath = this.#getFullPath(oldPath, false);
    const newFullPath = newDescriptor.#getFullPath(newPath, false);
    try {
      renameSync(oldFullPath, newFullPath);
    } catch (e) {
      if (isWindows && e.code === "EPERM") {
        throw "access";
      }
      throw convertFsError(e);
    }
  }
  symlinkAt(target, path2) {
    const fullPath = this.#getFullPath(path2, false);
    if (target.startsWith("/")) {
      throw "not-permitted";
    }
    try {
      symlinkSync(target, fullPath);
    } catch (e) {
      if (fullPath.endsWith("/") && e.code === "EEXIST") {
        let isDir = false;
        try {
          isDir = statSync(fullPath).isDirectory();
        } catch {
        }
        if (!isDir) {
          throw isWindows ? "no-entry" : "not-directory";
        }
      }
      if (isWindows) {
        if (e.code === "EPERM" || e.code === "EEXIST") {
          throw "no-entry";
        }
      }
      throw convertFsError(e);
    }
  }
  unlinkFileAt(path2) {
    const fullPath = this.#getFullPath(path2, false);
    try {
      if (fullPath.endsWith("/")) {
        let isDir = false;
        try {
          isDir = statSync(fullPath).isDirectory();
        } catch {
        }
        throw isDir ? isWindows ? "access" : isMac ? "not-permitted" : "is-directory" : "not-directory";
      }
      unlinkSync(fullPath);
    } catch (e) {
      if (isWindows && e.code === "EPERM") {
        throw "access";
      }
      throw convertFsError(e);
    }
  }
  isSameObject(other) {
    return other === this;
  }
  metadataHash() {
    if (this.#hostPreopen) {
      return { upper: 0n, lower: BigInt(this._id) };
    }
    try {
      const stats = fstatSync(this.#fd, { bigint: true });
      return { upper: stats.mtimeNs, lower: stats.ino };
    } catch (e) {
      throw convertFsError(e);
    }
  }
  metadataHashAt(pathFlags, path2) {
    const fullPath = this.#getFullPath(path2, false);
    try {
      const stats = (pathFlags.symlinkFollow ? statSync : lstatSync)(
        fullPath,
        {
          bigint: true
        }
      );
      return { upper: stats.mtimeNs, lower: stats.ino };
    } catch (e) {
      throw convertFsError(e);
    }
  }
  // TODO: support followSymlinks
  #getFullPath(subpath, _followSymlinks) {
    let descriptor = this;
    if (subpath.indexOf("\\") !== -1) {
      subpath = subpath.replace(/\\/g, "/");
    }
    if (subpath.indexOf("//") !== -1) {
      subpath = subpath.replace(/\/\/+/g, "/");
    }
    if (subpath[0] === "/") {
      throw "not-permitted";
    }
    const segments = [];
    let segmentIndex = -1;
    for (let i = 0; i < subpath.length; i++) {
      if (segmentIndex !== -1) {
        if (subpath[i] === "/") {
          segments.push(subpath.slice(segmentIndex, i + 1));
          segmentIndex = -1;
        }
        continue;
      } else if (subpath[i] === ".") {
        if (subpath[i + 1] === "." && (subpath[i + 2] === "/" || i + 2 === subpath.length)) {
          if (segments.pop() === void 0) {
            throw "not-permitted";
          }
          i += 2;
          continue;
        } else if (subpath[i + 1] === "/" || i + 1 === subpath.length) {
          i += 1;
          continue;
        }
      }
      while (subpath[i] === "/") {
        i++;
      }
      segmentIndex = i;
    }
    if (segmentIndex !== -1) {
      segments.push(subpath.slice(segmentIndex));
    }
    subpath = segments.join("");
    if (descriptor.#hostPreopen) {
      return descriptor.#hostPreopen + (descriptor.#hostPreopen.endsWith("/") ? "" : subpath.length > 0 ? "/" : "") + subpath;
    }
    return descriptor.#fullPath + (subpath.length > 0 ? "/" : "") + subpath;
  }
};
var descriptorCreatePreopen = Descriptor._createPreopen;
delete Descriptor._createPreopen;
var descriptorCreate = Descriptor._create;
delete Descriptor._create;
var DirectoryEntryStream = class _DirectoryEntryStream {
  #dir;
  #finalizer;
  readDirectoryEntry() {
    let entry;
    try {
      entry = this.#dir.readSync();
    } catch (e) {
      throw convertFsError(e);
    }
    if (entry === null) {
      return null;
    }
    const name = entry.name;
    const type = lookupType(entry);
    return { name, type };
  }
  static _create(dir) {
    const dirStream = new _DirectoryEntryStream();
    dirStream.#finalizer = registerDispose(
      dirStream,
      null,
      null,
      dir.closeSync.bind(dir)
    );
    dirStream.#dir = dir;
    return dirStream;
  }
  [symbolDispose2]() {
    if (this.#finalizer) {
      earlyDispose(this.#finalizer);
      this.#finalizer = null;
    }
  }
};
var directoryEntryStreamCreate = DirectoryEntryStream._create;
delete DirectoryEntryStream._create;
var preopenEntries = [];
var preopens = {
  Descriptor,
  getDirectories() {
    return preopenEntries;
  }
};
_addPreopen("/", isWindows ? "//" : "/");
var types = {
  Descriptor,
  DirectoryEntryStream,
  filesystemErrorCode(err) {
    return convertFsError(err.payload);
  }
};
function _addPreopen(virtualPath, hostPreopen) {
  const preopenEntry = [descriptorCreatePreopen(hostPreopen), virtualPath];
  preopenEntries.push(preopenEntry);
}
function convertFsError(e) {
  switch (e.code) {
    case "EACCES":
      return "access";
    case "EAGAIN":
    case "EWOULDBLOCK":
      return "would-block";
    case "EALREADY":
      return "already";
    case "EBADF":
      return "bad-descriptor";
    case "EBUSY":
      return "busy";
    case "EDEADLK":
      return "deadlock";
    case "EDQUOT":
      return "quota";
    case "EEXIST":
      return "exist";
    case "EFBIG":
      return "file-too-large";
    case "EILSEQ":
      return "illegal-byte-sequence";
    case "EINPROGRESS":
      return "in-progress";
    case "EINTR":
      return "interrupted";
    case "EINVAL":
      return "invalid";
    case "EIO":
      return "io";
    case "EISDIR":
      return "is-directory";
    case "ELOOP":
      return "loop";
    case "EMLINK":
      return "too-many-links";
    case "EMSGSIZE":
      return "message-size";
    case "ENAMETOOLONG":
      return "name-too-long";
    case "ENODEV":
      return "no-device";
    case "ENOENT":
      return "no-entry";
    case "ENOLCK":
      return "no-lock";
    case "ENOMEM":
      return "insufficient-memory";
    case "ENOSPC":
      return "insufficient-space";
    case "ENOTDIR":
    case "ERR_FS_EISDIR":
      return "not-directory";
    case "ENOTEMPTY":
      return "not-empty";
    case "ENOTRECOVERABLE":
      return "not-recoverable";
    case "ENOTSUP":
      return "unsupported";
    case "ENOTTY":
      return "no-tty";
    // windows gives this error for badly structured `//` reads
    // this seems like a slightly better error than unknown given
    // that it's a common footgun
    case -4094:
    case "ENXIO":
      return "no-such-device";
    case "EOVERFLOW":
      return "overflow";
    case "EPERM":
      return "not-permitted";
    case "EPIPE":
      return "pipe";
    case "EROFS":
      return "read-only";
    case "ESPIPE":
      return "invalid-seek";
    case "ETXTBSY":
      return "text-file-busy";
    case "EXDEV":
      return "cross-device";
    case "UNKNOWN":
      switch (e.errno) {
        case -4094:
          return "no-such-device";
        default:
          throw e;
      }
    default:
      throw e;
  }
}
function timestampToMs(timestamp) {
  return Number(timestamp.seconds) * 1e3 + timestamp.nanoseconds / 1e9;
}

// node_modules/@bytecodealliance/preview2-shim/lib/nodejs/random.js
import { randomBytes, randomFillSync } from "node:crypto";
var random = {
  getRandomBytes,
  getRandomU64() {
    return new BigUint64Array(randomBytes(8).buffer)[0];
  }
};
function getRandomBytes(len2) {
  return randomBytes(Number(len2));
}
getRandomBytes[/* @__PURE__ */ Symbol.for("cabiLower")] = ({ memory: memory2, realloc }) => {
  let buf32 = new Uint32Array(memory2.buffer);
  return function randomBytes2(len2, retptr) {
    len2 = Number(len2);
    const ptr = realloc(0, 0, 1, len2);
    randomFillSync(memory2.buffer, ptr, len2);
    if (memory2.buffer !== buf32.buffer) {
      buf32 = new Uint32Array(memory2.buffer);
    }
    if (retptr % 4) {
      throw new Error("wasi-io trap: retptr not aligned");
    }
    buf32[retptr >> 2] = ptr;
    buf32[(retptr >> 2) + 1] = len2;
  };
};

// action.js
var {
  getArguments,
  getEnvironment,
  initialCwd
} = environment;
getArguments._isHostProvided = true;
if (getArguments === void 0) {
  const err = new Error("unexpectedly undefined local import 'getArguments', was 'getArguments' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
getEnvironment._isHostProvided = true;
if (getEnvironment === void 0) {
  const err = new Error("unexpectedly undefined local import 'getEnvironment', was 'getEnvironment' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
initialCwd._isHostProvided = true;
if (initialCwd === void 0) {
  const err = new Error("unexpectedly undefined local import 'initialCwd', was 'initialCwd' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { exit: exit3 } = exit2;
exit3._isHostProvided = true;
if (exit3 === void 0) {
  const err = new Error("unexpectedly undefined local import 'exit', was 'exit' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStderr } = stderr2;
getStderr._isHostProvided = true;
if (getStderr === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStderr', was 'getStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStdin } = stdin;
getStdin._isHostProvided = true;
if (getStdin === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStdin', was 'getStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStdout } = stdout2;
getStdout._isHostProvided = true;
if (getStdout === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStdout', was 'getStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { now } = monotonicClock;
now._isHostProvided = true;
if (now === void 0) {
  const err = new Error("unexpectedly undefined local import 'now', was 'now' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { now: now$1 } = wallClock;
now$1._isHostProvided = true;
if (now$1 === void 0) {
  const err = new Error("unexpectedly undefined local import 'now$1', was 'now' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getDirectories } = preopens;
getDirectories._isHostProvided = true;
if (getDirectories === void 0) {
  const err = new Error("unexpectedly undefined local import 'getDirectories', was 'getDirectories' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  Descriptor: Descriptor2,
  DirectoryEntryStream: DirectoryEntryStream2
} = types;
Descriptor2._isHostProvided = true;
if (Descriptor2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'Descriptor', was 'Descriptor' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
DirectoryEntryStream2._isHostProvided = true;
if (DirectoryEntryStream2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'DirectoryEntryStream', was 'DirectoryEntryStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { Error: Error$1 } = error;
Error$1._isHostProvided = true;
if (Error$1 === void 0) {
  const err = new Error("unexpectedly undefined local import 'Error$1', was 'Error' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  InputStream: InputStream3,
  OutputStream: OutputStream3
} = streams;
InputStream3._isHostProvided = true;
if (InputStream3 === void 0) {
  const err = new Error("unexpectedly undefined local import 'InputStream', was 'InputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
OutputStream3._isHostProvided = true;
if (OutputStream3 === void 0) {
  const err = new Error("unexpectedly undefined local import 'OutputStream', was 'OutputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  getRandomBytes: getRandomBytes2,
  getRandomU64
} = random;
getRandomBytes2._isHostProvided = true;
if (getRandomBytes2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'getRandomBytes', was 'getRandomBytes' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
getRandomU64._isHostProvided = true;
if (getRandomU64 === void 0) {
  const err = new Error("unexpectedly undefined local import 'getRandomU64', was 'getRandomU64' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
function promiseWithResolvers() {
  if (Promise.withResolvers) {
    return Promise.withResolvers();
  } else {
    let resolve2;
    let reject2;
    const promise = new Promise((res, rej) => {
      resolve2 = res;
      reject2 = rej;
    });
    return { promise, resolve: resolve2, reject: reject2 };
  }
}
var symbolDispose3 = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var _debugLog = (...args) => {
  if (!globalThis?.process?.env?.JCO_DEBUG) {
    return;
  }
  console.debug(...args);
};
var ASYNC_DETERMINISM = "random";
var GLOBAL_COMPONENT_MEMORY_MAP = /* @__PURE__ */ new Map();
var CURRENT_TASK_META = {};
function _getGlobalCurrentTaskMeta(componentIdx2) {
  const v = CURRENT_TASK_META[componentIdx2];
  if (v === void 0) {
    return v;
  }
  return { ...v };
}
function _setGlobalCurrentTaskMeta(args) {
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const { taskID, componentIdx: componentIdx2 } = args;
  return CURRENT_TASK_META[componentIdx2] = { taskID, componentIdx: componentIdx2 };
}
function _withGlobalCurrentTaskMeta(args) {
  _debugLog("[_withGlobalCurrentTaskMeta()] args", args);
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  if (!args.fn) {
    throw new TypeError("missing fn");
  }
  const { taskID, componentIdx: componentIdx2, fn } = args;
  try {
    CURRENT_TASK_META[componentIdx2] = { taskID, componentIdx: componentIdx2 };
    return fn();
  } catch (err) {
    _debugLog("error while executing sync callee/callback", {
      ...args,
      err
    });
    throw err;
  } finally {
    CURRENT_TASK_META[componentIdx2] = null;
  }
}
async function _clearCurrentTask(args) {
  _debugLog("[_clearCurrentTask()] args", args);
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const { taskID, componentIdx: componentIdx2 } = args;
  const meta = CURRENT_TASK_META[componentIdx2];
  if (!meta) {
    throw new Error(`missing current task meta for component idx [${componentIdx2}]`);
  }
  if (meta.taskID !== taskID) {
    throw new Error(`task ID [${meta.taskID}] != requested ID [${taskID}]`);
  }
  if (meta.componentIdx !== componentIdx2) {
    throw new Error(`component idx [${meta.componentIdx}] != requested idx [${componentIdx2}]`);
  }
  CURRENT_TASK_META[componentIdx2] = null;
}
function lookupMemoriesForComponent(args) {
  const { componentIdx: componentIdx2 } = args ?? {};
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const metas = GLOBAL_COMPONENT_MEMORY_MAP.get(componentIdx2);
  if (!metas) {
    return [];
  }
  if (args.memoryIdx === void 0) {
    return Object.values(metas);
  }
  const meta = metas[args.memoryIdx];
  return meta?.memory;
}
var RepTable = class {
  #data = [0, null];
  #target;
  constructor(args) {
    this.target = args?.target;
  }
  data() {
    return this.#data;
  }
  insert(val) {
    _debugLog("[RepTable#insert()] args", { val, target: this.target });
    const freeIdx = this.#data[0];
    if (freeIdx === 0) {
      this.#data.push(val);
      this.#data.push(null);
      const rep3 = (this.#data.length >> 1) - 1;
      _debugLog("[RepTable#insert()] inserted", { val, target: this.target, rep: rep3 });
      return rep3;
    }
    this.#data[0] = this.#data[freeIdx << 1];
    const placementIdx = freeIdx << 1;
    this.#data[placementIdx] = val;
    this.#data[placementIdx + 1] = null;
    _debugLog("[RepTable#insert()] inserted", { val, target: this.target, rep: freeIdx });
    return freeIdx;
  }
  get(rep3) {
    _debugLog("[RepTable#get()] args", { rep: rep3, target: this.target });
    if (rep3 === 0) {
      throw new Error("invalid resource rep during get, (cannot be 0)");
    }
    const baseIdx = rep3 << 1;
    const val = this.#data[baseIdx];
    return val;
  }
  contains(rep3) {
    _debugLog("[RepTable#contains()] args", { rep: rep3, target: this.target });
    if (rep3 === 0) {
      throw new Error("invalid resource rep during contains, (cannot be 0)");
    }
    const baseIdx = rep3 << 1;
    return !!this.#data[baseIdx];
  }
  remove(rep3) {
    _debugLog("[RepTable#remove()] args", { rep: rep3, target: this.target });
    if (rep3 === 0) {
      throw new Error("invalid resource rep during remove, (cannot be 0)");
    }
    if (this.#data.length === 2) {
      throw new Error("invalid");
    }
    const baseIdx = rep3 << 1;
    const val = this.#data[baseIdx];
    this.#data[baseIdx] = this.#data[0];
    this.#data[0] = rep3;
    return val;
  }
  clear() {
    _debugLog("[RepTable#clear()] args", { rep, target: this.target });
    this.#data = [0, null];
  }
};
var ASYNC_FN_CTOR = (async () => {
}).constructor;
function clearCurrentTask(componentIdx2, taskID) {
  _debugLog("[clearCurrentTask()] args", { componentIdx: componentIdx2, taskID });
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing/invalid component instance index while ending current task");
  }
  const tasks = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  if (!tasks || !Array.isArray(tasks)) {
    throw new Error("missing/invalid tasks for component instance while ending task");
  }
  if (tasks.length == 0) {
    throw new Error(`no current tasks for component instance [${componentIdx2}] while ending task`);
  }
  if (taskID !== void 0) {
    const last = tasks[tasks.length - 1];
    if (last.id !== taskID) {
      return;
    }
  }
  ASYNC_CURRENT_TASK_IDS.pop();
  ASYNC_CURRENT_COMPONENT_IDXS.pop();
  const taskMeta = tasks.pop();
  return taskMeta.task;
}
var CURRENT_TASK_MAY_BLOCK = new WebAssembly.Global({ value: "i32", mutable: true }, 0);
var ASYNC_CURRENT_TASK_IDS = [];
var ASYNC_CURRENT_COMPONENT_IDXS = [];
var AsyncSubtask = class _AsyncSubtask {
  static _ID = 0n;
  static State = {
    STARTING: 0,
    STARTED: 1,
    RETURNED: 2,
    CANCELLED_BEFORE_STARTED: 3,
    CANCELLED_BEFORE_RETURNED: 4
  };
  #id;
  #state = _AsyncSubtask.State.STARTING;
  #componentIdx;
  #parentTask;
  #childTask = null;
  #dropped = false;
  #cancelRequested = false;
  #memoryIdx = null;
  #lenders = null;
  #waitable = null;
  #callbackFn = null;
  #callbackFnName = null;
  #postReturnFn = null;
  #onProgressFn = null;
  #pendingEventFn = null;
  #callMetadata = {};
  #resolved = false;
  #onResolveHandlers = [];
  #onStartHandlers = [];
  #result = null;
  #resultSet = false;
  fnName;
  target;
  isAsync;
  isManualAsync;
  constructor(args) {
    if (typeof args.componentIdx !== "number") {
      throw new Error("invalid componentIdx for subtask creation");
    }
    this.#componentIdx = args.componentIdx;
    this.#id = ++_AsyncSubtask._ID;
    this.fnName = args.fnName;
    if (!args.parentTask) {
      throw new Error("missing parent task during subtask creation");
    }
    this.#parentTask = args.parentTask;
    if (args.childTask) {
      this.#childTask = args.childTask;
    }
    if (args.memoryIdx) {
      this.#memoryIdx = args.memoryIdx;
    }
    if (!args.waitable) {
      throw new Error("missing/invalid waitable");
    }
    this.#waitable = args.waitable;
    if (args.callMetadata) {
      this.#callMetadata = args.callMetadata;
    }
    this.#lenders = [];
    this.target = args.target;
    this.isAsync = args.isAsync;
    this.isManualAsync = args.isManualAsync;
  }
  id() {
    return this.#id;
  }
  parentTaskID() {
    return this.#parentTask?.id();
  }
  childTaskID() {
    return this.#childTask?.id();
  }
  state() {
    return this.#state;
  }
  waitable() {
    return this.#waitable;
  }
  waitableRep() {
    return this.#waitable.idx();
  }
  join() {
    return this.#waitable.join(...arguments);
  }
  getPendingEvent() {
    return this.#waitable.getPendingEvent(...arguments);
  }
  hasPendingEvent() {
    return this.#waitable.hasPendingEvent(...arguments);
  }
  setPendingEvent() {
    return this.#waitable.setPendingEvent(...arguments);
  }
  setTarget(tgt) {
    this.target = tgt;
  }
  getResult() {
    if (!this.#resultSet) {
      throw new Error("subtask result has not been set");
    }
    return this.#result;
  }
  setResult(v) {
    if (this.#resultSet) {
      throw new Error("subtask result has already been set");
    }
    this.#result = v;
    this.#resultSet = true;
  }
  componentIdx() {
    return this.#componentIdx;
  }
  setChildTask(t) {
    if (!t) {
      throw new Error("cannot set missing/invalid child task on subtask");
    }
    if (this.#childTask) {
      throw new Error("child task is already set on subtask");
    }
    if (this.#parentTask === t) {
      throw new Error("parent cannot be child");
    }
    this.#childTask = t;
  }
  getChildTask(t) {
    return this.#childTask;
  }
  getParentTask() {
    return this.#parentTask;
  }
  setCallbackFn(f, name) {
    if (!f) {
      return;
    }
    if (this.#callbackFn) {
      throw new Error("callback fn can only be set once");
    }
    this.#callbackFn = f;
    this.#callbackFnName = name;
  }
  getCallbackFnName() {
    if (!this.#callbackFn) {
      return void 0;
    }
    return this.#callbackFn.name;
  }
  setPostReturnFn(f) {
    if (!f) {
      return;
    }
    if (this.#postReturnFn) {
      throw new Error("postReturn fn can only be set once");
    }
    this.#postReturnFn = f;
  }
  setOnProgressFn(f) {
    if (this.#onProgressFn) {
      throw new Error("on progress fn can only be set once");
    }
    this.#onProgressFn = f;
  }
  isNotStarted() {
    return this.#state == _AsyncSubtask.State.STARTING;
  }
  registerOnStartHandler(f) {
    this.#onStartHandlers.push(f);
  }
  onStart(args) {
    _debugLog("[AsyncSubtask#onStart()] args", {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      parentTaskID: this.parentTaskID(),
      fnName: this.fnName
    });
    if (this.#onProgressFn) {
      this.#onProgressFn();
    }
    this.#state = _AsyncSubtask.State.STARTED;
    let result;
    if (this.#callMetadata.startFn) {
      result = this.#callMetadata.startFn.apply(null, args?.startFnParams ?? []);
    }
    return result;
  }
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  reject(subtaskErr) {
    this.#childTask?.reject(subtaskErr);
  }
  onResolve(subtaskValue) {
    _debugLog("[AsyncSubtask#onResolve()] args", {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      isAsync: this.isAsync,
      childTaskID: this.childTaskID(),
      parentTaskID: this.parentTaskID(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      fnName: this.fnName
    });
    if (this.#resolved) {
      throw new Error("subtask has already been resolved");
    }
    if (this.#onProgressFn) {
      this.#onProgressFn();
    }
    if (subtaskValue === null) {
      if (this.#cancelRequested) {
        throw new Error("cancel was not requested, but no value present at return");
      }
      if (this.#state === _AsyncSubtask.State.STARTING) {
        this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
      } else {
        if (this.#state !== _AsyncSubtask.State.STARTED) {
          throw new Error("resolved subtask must have been started before cancellation");
        }
        this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
      }
    } else {
      if (this.#state !== _AsyncSubtask.State.STARTED) {
        throw new Error("resolved subtask must have been started before completion");
      }
      this.#state = _AsyncSubtask.State.RETURNED;
    }
    this.setResult(subtaskValue);
    for (const f of this.#onResolveHandlers) {
      try {
        f(subtaskValue);
      } catch (err) {
        console.error("error during subtask resolve handler", err);
        throw err;
      }
    }
    const callMetadata = this.getCallMetadata();
    const memory2 = callMetadata.memory ?? this.#parentTask?.getReturnMemory() ?? lookupMemoriesForComponent({ componentIdx: this.#parentTask?.componentIdx() })[0];
    if (callMetadata && !callMetadata.returnFn && this.isAsync && callMetadata.resultPtr && memory2) {
      const { resultPtr, realloc } = callMetadata;
      const lowers = callMetadata.lowers;
      if (lowers && lowers.length > 0) {
        lowers[0]({
          componentIdx: this.#componentIdx,
          memory: memory2,
          realloc,
          vals: [subtaskValue],
          storagePtr: resultPtr
        });
      }
    }
    this.#resolved = true;
    this.#parentTask.removeSubtask(this);
  }
  getStateNumber() {
    return this.#state;
  }
  isReturned() {
    return this.#state === _AsyncSubtask.State.RETURNED;
  }
  getCallMetadata() {
    return this.#callMetadata;
  }
  isResolved() {
    if (this.#state === _AsyncSubtask.State.STARTING || this.#state === _AsyncSubtask.State.STARTED) {
      return false;
    }
    if (this.#state === _AsyncSubtask.State.RETURNED || this.#state === _AsyncSubtask.State.CANCELLED_BEFORE_STARTED || this.#state === _AsyncSubtask.State.CANCELLED_BEFORE_RETURNED) {
      return true;
    }
    throw new Error("unrecognized internal Subtask state [" + this.#state + "]");
  }
  addLender(handle) {
    _debugLog("[AsyncSubtask#addLender()] args", { handle });
    if (!Number.isNumber(handle)) {
      throw new Error("missing/invalid lender handle [" + handle + "]");
    }
    if (this.#lenders.length === 0 || this.isResolved()) {
      throw new Error("subtask has no lendors or has already been resolved");
    }
    handle.lends++;
    this.#lenders.push(handle);
  }
  deliverResolve() {
    _debugLog("[AsyncSubtask#deliverResolve()] args", {
      lenders: this.#lenders,
      parentTaskID: this.parentTaskID(),
      subtaskID: this.#id,
      childTaskID: this.childTaskID(),
      resolved: this.isResolved(),
      resolveDelivered: this.resolveDelivered()
    });
    const cannotDeliverResolve = this.resolveDelivered() || !this.isResolved();
    if (cannotDeliverResolve) {
      throw new Error("subtask cannot deliver resolution twice, and the subtask must be resolved");
    }
    for (const lender of this.#lenders) {
      lender.lends--;
    }
    this.#lenders = null;
  }
  resolveDelivered() {
    _debugLog("[AsyncSubtask#resolveDelivered()] args", {});
    if (this.#lenders === null && !this.isResolved()) {
      throw new Error("invalid subtask state, lenders missing and subtask has not been resolved");
    }
    return this.#lenders === null;
  }
  drop() {
    _debugLog("[AsyncSubtask#drop()] args", {
      componentIdx: this.#componentIdx,
      parentTaskID: this.#parentTask?.id(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      childTaskID: this.#childTask?.id(),
      childTaskFnName: this.#childTask?.entryFnName(),
      subtaskFnName: this.fnName
    });
    if (!this.#waitable) {
      throw new Error("missing/invalid inner waitable");
    }
    if (!this.resolveDelivered()) {
      throw new Error("cannot drop subtask before resolve is delivered");
    }
    if (this.#waitable) {
      this.#waitable.drop();
    }
    this.#dropped = true;
  }
  #getComponentState() {
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) {
      throw new Error("invalid/missing async state for component [" + componentIdx + "]");
    }
    return state;
  }
  getWaitableHandleIdx() {
    _debugLog("[AsyncSubtask#getWaitableHandleIdx()] args", {});
    if (!this.#waitable) {
      throw new Error("missing/invalid waitable");
    }
    return this.waitableRep();
  }
};
var Waitable = class {
  #componentIdx;
  #pendingEventFn = null;
  #promise;
  #resolve;
  #reject;
  #waitableSet = null;
  #idx = null;
  // to component-global waitables
  target;
  constructor(args) {
    const { componentIdx: componentIdx2, target } = args;
    this.#componentIdx = componentIdx2;
    this.target = args.target;
    this.#resetPromise();
  }
  componentIdx() {
    return this.#componentIdx;
  }
  isInSet() {
    return this.#waitableSet !== null;
  }
  idx() {
    return this.#idx;
  }
  setIdx(idx) {
    if (idx === 0) {
      throw new Error("waitable idx cannot be zero");
    }
    this.#idx = idx;
  }
  setTarget(tgt) {
    this.target = tgt;
  }
  #resetPromise() {
    const { promise, resolve: resolve2, reject: reject2 } = promiseWithResolvers();
    this.#promise = promise;
    this.#resolve = resolve2;
    this.#reject = reject2;
  }
  resolve() {
    this.#resolve();
  }
  reject(err) {
    this.#reject(err);
  }
  promise() {
    return this.#promise;
  }
  hasPendingEvent() {
    return this.#pendingEventFn !== null;
  }
  setPendingEvent(fn) {
    _debugLog("[Waitable#setPendingEvent()] args", {
      waitable: this,
      inSet: this.#waitableSet
    });
    this.#pendingEventFn = fn;
  }
  getPendingEvent() {
    _debugLog("[Waitable#getPendingEvent()] args", {
      waitable: this,
      inSet: this.#waitableSet,
      hasPendingEvent: this.#pendingEventFn !== null
    });
    if (this.#pendingEventFn === null) {
      return null;
    }
    const eventFn = this.#pendingEventFn;
    this.#pendingEventFn = null;
    const e = eventFn();
    this.#resetPromise();
    return e;
  }
  join(waitableSet) {
    _debugLog("[Waitable#join()] args", {
      waitable: this,
      waitableSet
    });
    if (this.#waitableSet) {
      this.#waitableSet.removeWaitable(this);
    }
    if (!waitableSet) {
      this.#waitableSet = null;
      return;
    }
    waitableSet.addWaitable(this);
    this.#waitableSet = waitableSet;
  }
  drop() {
    _debugLog("[Waitable#drop()] args", {
      componentIdx: this.#componentIdx,
      waitable: this
    });
    if (this.hasPendingEvent()) {
      throw new Error("waitables with pending events cannot be dropped");
    }
    this.join(null);
  }
};
var dv = new DataView(new ArrayBuffer());
var dataView = (mem) => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);
var toUint64 = (val) => BigInt.asUintN(64, BigInt(val));
function toUint32(val) {
  return val >>> 0;
}
var TEXT_DECODER_UTF8 = new TextDecoder();
var TEXT_ENCODER_UTF8 = new TextEncoder();
function _utf8AllocateAndEncode(s, realloc, memory2) {
  if (typeof s !== "string") {
    throw new TypeError("expected a string, received [" + typeof s + "]");
  }
  if (s.length === 0) {
    return { ptr: 1, len: 0 };
  }
  let buf = TEXT_ENCODER_UTF8.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory2.buffer).set(buf, ptr);
  const res = { ptr, len: buf.length, codepoints: [...s].length };
  return res;
}
var T_FLAG2 = 1 << 30;
function rscTableCreateOwn(table, rep3) {
  const free = table[0] & ~T_FLAG2;
  if (free === 0) {
    table.push(0);
    table.push(rep3 | T_FLAG2);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep3 | T_FLAG2;
  return free;
}
function rscTableRemove(table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG2) !== 0;
  const rep3 = val & ~T_FLAG2;
  if (val === 0 || (scope & T_FLAG2) !== 0) {
    throw new TypeError("Invalid handle");
  }
  table[handle << 1] = table[0] | T_FLAG2;
  table[0] = handle | T_FLAG2;
  return { rep: rep3, scope, own };
}
var curResourceBorrows = [];
function getCurrentTask(componentIdx2, taskID) {
  let usedGlobal = false;
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing component idx");
  }
  const taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  if (taskMetas === void 0 || taskMetas.length === 0) {
    return void 0;
  }
  if (taskID) {
    return taskMetas.find((meta) => meta.task.id() === taskID);
  }
  const taskMeta = taskMetas[taskMetas.length - 1];
  if (!taskMeta || !taskMeta.task) {
    return void 0;
  }
  return taskMeta;
}
function createNewCurrentTask(args) {
  _debugLog("[createNewCurrentTask()] args", args);
  const {
    componentIdx: componentIdx2,
    isAsync,
    isManualAsync,
    entryFnName,
    parentSubtaskID,
    callbackFnName,
    getCallbackFn,
    getParamsFn,
    stringEncoding,
    errHandling,
    getCalleeParamsFn,
    resultPtr,
    callingWasmExport
  } = args;
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing/invalid component instance index while starting task");
  }
  let taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  const callbackFn = getCallbackFn ? getCallbackFn() : null;
  const newTask = new AsyncTask({
    componentIdx: componentIdx2,
    isAsync,
    isManualAsync,
    entryFnName,
    callbackFn,
    callbackFnName,
    stringEncoding,
    getCalleeParamsFn,
    resultPtr,
    errHandling
  });
  const newTaskID = newTask.id();
  const newTaskMeta = { id: newTaskID, componentIdx: componentIdx2, task: newTask };
  ASYNC_CURRENT_TASK_IDS.push(newTaskID);
  ASYNC_CURRENT_COMPONENT_IDXS.push(componentIdx2);
  if (!taskMetas) {
    taskMetas = [newTaskMeta];
    ASYNC_TASKS_BY_COMPONENT_IDX.set(componentIdx2, [newTaskMeta]);
  } else {
    taskMetas.push(newTaskMeta);
  }
  return [newTask, newTaskID];
}
var ASYNC_TASKS_BY_COMPONENT_IDX = /* @__PURE__ */ new Map();
var AsyncTask = class _AsyncTask {
  static _ID = 0n;
  static State = {
    INITIAL: "initial",
    CANCELLED: "cancelled",
    CANCEL_PENDING: "cancel-pending",
    CANCEL_DELIVERED: "cancel-delivered",
    RESOLVED: "resolved"
  };
  static BlockResult = {
    CANCELLED: "block.cancelled",
    NOT_CANCELLED: "block.not-cancelled"
  };
  #id;
  #componentIdx;
  #state;
  #isAsync;
  #isManualAsync;
  #entryFnName = null;
  #onResolveHandlers = [];
  #completionPromise = null;
  #rejected = false;
  #exitPromise = null;
  #onExitHandlers = [];
  #memoryIdx = null;
  #memory = null;
  #callbackFn = null;
  #callbackFnName = null;
  #postReturnFn = null;
  #getCalleeParamsFn = null;
  #stringEncoding = null;
  #parentSubtask = null;
  #needsExclusiveLock = false;
  #errHandling;
  #backpressurePromise;
  #backpressureWaiters = 0n;
  #returnLowerFns = null;
  #subtasks = [];
  #entered = false;
  #exited = false;
  #errored = null;
  cancelled = false;
  cancelRequested = false;
  alwaysTaskReturn = false;
  returnCalls = 0;
  storage = [0, 0];
  borrowedHandles = {};
  constructor(opts) {
    this.#id = ++_AsyncTask._ID;
    if (opts?.componentIdx === void 0) {
      throw new TypeError("missing component id during task creation");
    }
    this.#componentIdx = opts.componentIdx;
    this.#state = _AsyncTask.State.INITIAL;
    this.#isAsync = opts?.isAsync ?? false;
    this.#isManualAsync = opts?.isManualAsync ?? false;
    this.#entryFnName = opts.entryFnName;
    const {
      promise: completionPromise,
      resolve: resolveCompletionPromise,
      reject: rejectCompletionPromise
    } = promiseWithResolvers();
    this.#completionPromise = completionPromise;
    this.#onResolveHandlers.push((results) => {
      if (this.#errored !== null) {
        rejectCompletionPromise(this.#errored);
        return;
      } else if (this.#rejected) {
        rejectCompletionPromise(results);
        return;
      }
      resolveCompletionPromise(results);
    });
    const {
      promise: exitPromise,
      resolve: resolveExitPromise,
      reject: rejectExitPromise
    } = promiseWithResolvers();
    this.#exitPromise = exitPromise;
    this.#onExitHandlers.push(() => {
      resolveExitPromise();
    });
    if (opts.callbackFn) {
      this.#callbackFn = opts.callbackFn;
    }
    if (opts.callbackFnName) {
      this.#callbackFnName = opts.callbackFnName;
    }
    if (opts.getCalleeParamsFn) {
      this.#getCalleeParamsFn = opts.getCalleeParamsFn;
    }
    if (opts.stringEncoding) {
      this.#stringEncoding = opts.stringEncoding;
    }
    if (opts.parentSubtask) {
      this.#parentSubtask = opts.parentSubtask;
    }
    this.#needsExclusiveLock = this.isSync() || !this.hasCallback();
    if (opts.errHandling) {
      this.#errHandling = opts.errHandling;
    }
  }
  taskState() {
    return this.#state;
  }
  id() {
    return this.#id;
  }
  componentIdx() {
    return this.#componentIdx;
  }
  entryFnName() {
    return this.#entryFnName;
  }
  completionPromise() {
    return this.#completionPromise;
  }
  exitPromise() {
    return this.#exitPromise;
  }
  isAsync() {
    return this.#isAsync;
  }
  isSync() {
    return !this.isAsync();
  }
  getErrHandling() {
    return this.#errHandling;
  }
  hasCallback() {
    return this.#callbackFn !== null;
  }
  getReturnMemoryIdx() {
    return this.#memoryIdx;
  }
  setReturnMemoryIdx(idx) {
    if (idx === null) {
      return;
    }
    this.#memoryIdx = idx;
  }
  getReturnMemory() {
    return this.#memory;
  }
  setReturnMemory(m) {
    if (m === null) {
      return;
    }
    this.#memory = m;
  }
  setReturnLowerFns(fns) {
    this.#returnLowerFns = fns;
  }
  getReturnLowerFns() {
    return this.#returnLowerFns;
  }
  setParentSubtask(subtask) {
    if (!subtask || !(subtask instanceof AsyncSubtask)) {
      return;
    }
    if (this.#parentSubtask) {
      throw new Error("parent subtask can only be set once");
    }
    this.#parentSubtask = subtask;
  }
  getParentSubtask() {
    return this.#parentSubtask;
  }
  // TODO(threads): this is very inefficient, we can pass along a root task,
  // and ideally do not need this once thread support is in place
  getRootTask() {
    let currentSubtask = this.getParentSubtask();
    let task = this;
    while (currentSubtask) {
      task = currentSubtask.getParentTask();
      currentSubtask = task.getParentSubtask();
    }
    return task;
  }
  setPostReturnFn(f) {
    if (!f) {
      return;
    }
    if (this.#postReturnFn) {
      throw new Error("postReturn fn can only be set once");
    }
    this.#postReturnFn = f;
  }
  setCallbackFn(f, name) {
    if (!f) {
      return;
    }
    if (this.#callbackFn) {
      throw new Error("callback fn can only be set once");
    }
    this.#callbackFn = f;
    this.#callbackFnName = name;
  }
  getCallbackFnName() {
    if (!this.#callbackFnName) {
      return void 0;
    }
    return this.#callbackFnName;
  }
  async runCallbackFn(...args) {
    if (!this.#callbackFn) {
      throw new Error("on callback function has been set for task");
    }
    return await this.#callbackFn.apply(null, args);
  }
  getCalleeParams() {
    if (!this.#getCalleeParamsFn) {
      throw new Error("missing/invalid getCalleeParamsFn");
    }
    return this.#getCalleeParamsFn();
  }
  mayBlock() {
    return this.isAsync() || this.isResolvedState();
  }
  mayEnter(task) {
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (cstate.hasBackpressure()) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to backpressure", { taskID: this.#id });
      return false;
    }
    if (!cstate.callingSyncImport()) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to sync import call", { taskID: this.#id });
      return false;
    }
    const callingSyncExportWithSyncPending = cstate.callingSyncExport && !task.isAsync;
    if (!callingSyncExportWithSyncPending) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to sync export w/ sync pending", { taskID: this.#id });
      return false;
    }
    return true;
  }
  enterSync() {
    if (this.needsExclusiveLock()) {
      const cstate = getOrCreateAsyncState(this.#componentIdx);
      cstate.exclusiveLock();
    }
    return true;
  }
  async enter(opts) {
    _debugLog("[AsyncTask#enter()] args", {
      taskID: this.#id,
      componentIdx: this.#componentIdx,
      subtaskID: this.getParentSubtask()?.id()
    });
    if (this.#entered) {
      throw new Error(`task with ID [${this.#id}] should not be entered twice`);
    }
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (this.isSync() || opts?.isHost) {
      this.#entered = true;
      if (this.#isManualAsync) {
        if (this.needsExclusiveLock()) {
          cstate.exclusiveLock();
        }
      }
      return this.#entered;
    }
    if (cstate.hasBackpressure()) {
      cstate.addBackpressureWaiter();
      const result = await this.waitUntil({
        readyFn: () => !cstate.hasBackpressure(),
        cancellable: true
      });
      cstate.removeBackpressureWaiter();
      if (result === _AsyncTask.BlockResult.CANCELLED) {
        this.cancel();
        return false;
      }
    }
    if (this.needsExclusiveLock()) {
      cstate.exclusiveLock();
    }
    this.#entered = true;
    return this.#entered;
  }
  isRunningState() {
    return this.#state !== _AsyncTask.State.RESOLVED;
  }
  isResolvedState() {
    return this.#state === _AsyncTask.State.RESOLVED;
  }
  isResolved() {
    return this.#state === _AsyncTask.State.RESOLVED;
  }
  async waitUntil(opts) {
    const { readyFn, waitableSetRep, cancellable } = opts;
    _debugLog("[AsyncTask#waitUntil()] args", { taskID: this.#id, waitableSetRep, cancellable });
    const state = getOrCreateAsyncState(this.#componentIdx);
    const wset = state.handles.get(waitableSetRep);
    let event;
    wset.incrementNumWaiting();
    const keepGoing = await this.suspendUntil({
      readyFn: () => {
        const hasPendingEvent = wset.hasPendingEvent();
        const ready = readyFn();
        return ready && hasPendingEvent;
      },
      cancellable
    });
    if (keepGoing) {
      event = wset.getPendingEvent();
    } else {
      event = {
        code: ASYNC_EVENT_CODE.TASK_CANCELLED,
        payload0: 0,
        payload1: 0
      };
    }
    wset.decrementNumWaiting();
    return event;
  }
  async yieldUntil(opts) {
    const { readyFn, cancellable } = opts;
    _debugLog("[AsyncTask#yieldUntil()] args", { taskID: this.#id, cancellable });
    const keepGoing = await this.suspendUntil({ readyFn, cancellable });
    if (keepGoing) {
      return {
        code: ASYNC_EVENT_CODE.NONE,
        payload0: 0,
        payload1: 0
      };
    }
    return {
      code: ASYNC_EVENT_CODE.TASK_CANCELLED,
      payload0: 0,
      payload1: 0
    };
  }
  async suspendUntil(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#suspendUntil()] args", { cancellable });
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) {
      return false;
    }
    const completed = await this.immediateSuspendUntil({ readyFn, cancellable });
    return completed;
  }
  // TODO(threads): equivalent to thread.suspend_until()
  async immediateSuspendUntil(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#immediateSuspendUntil()] args", { cancellable, readyFn });
    const ready = readyFn();
    if (ready && ASYNC_DETERMINISM === "random") {
      return true;
    }
    const keepGoing = await this.immediateSuspend({ cancellable, readyFn });
    return keepGoing;
  }
  async immediateSuspend(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#immediateSuspend()] args", { cancellable, readyFn });
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) {
      return false;
    }
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    const keepGoing = await cstate.suspendTask({ task: this, readyFn });
    return keepGoing;
  }
  deliverPendingCancel(opts) {
    const { cancellable } = opts;
    _debugLog("[AsyncTask#deliverPendingCancel()] args", { cancellable });
    if (cancellable && this.#state === _AsyncTask.State.PENDING_CANCEL) {
      this.#state = _AsyncTask.State.CANCEL_DELIVERED;
      return true;
    }
    return false;
  }
  isCancelled() {
    return this.cancelled;
  }
  cancel(args) {
    _debugLog("[AsyncTask#cancel()] args", {});
    if (this.taskState() !== _AsyncTask.State.CANCEL_DELIVERED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] invalid task state [${this.taskState()}] for cancellation`);
    }
    if (this.borrowedHandles.length > 0) {
      throw new Error("task still has borrow handles");
    }
    this.cancelled = true;
    this.onResolve(args?.error ?? new Error("task cancelled"));
    this.#state = _AsyncTask.State.RESOLVED;
  }
  onResolve(taskValue) {
    const handlers = this.#onResolveHandlers;
    this.#onResolveHandlers = [];
    for (const f of handlers) {
      try {
        f(taskValue);
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    if (this.#parentSubtask) {
      const meta = this.#parentSubtask.getCallMetadata();
      if (meta.returnFn && !meta.returnFnCalled) {
        _debugLog("[AsyncTask#onResolve()] running returnFn", {
          componentIdx: this.#componentIdx,
          taskID: this.#id,
          subtaskID: this.#parentSubtask.id()
        });
        const memory2 = meta.getMemoryFn();
        meta.returnFn.apply(null, [taskValue, meta.resultPtr]);
        meta.returnFnCalled = true;
      }
    }
    if (this.#postReturnFn) {
      _debugLog("[AsyncTask#onResolve()] running post return ", {
        componentIdx: this.#componentIdx,
        taskID: this.#id
      });
      try {
        this.#postReturnFn(taskValue);
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    if (this.#parentSubtask) {
      this.#parentSubtask.onResolve(taskValue);
    }
  }
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  isRejected() {
    return this.#rejected;
  }
  setErrored(err) {
    this.#errored = err;
  }
  reject(taskErr) {
    _debugLog("[AsyncTask#reject()] args", {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      parentSubtask: this.#parentSubtask,
      parentSubtaskID: this.#parentSubtask?.id(),
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
      errMsg: taskErr.message
    });
    if (this.isResolvedState() || this.#rejected) {
      return;
    }
    for (const subtask of this.#subtasks) {
      subtask.reject(taskErr);
    }
    this.#rejected = true;
    this.cancelRequested = true;
    this.#state = _AsyncTask.State.PENDING_CANCEL;
    const cancelled = this.deliverPendingCancel({ cancellable: true });
    this.cancel({ error: taskErr });
  }
  resolve(results) {
    _debugLog("[AsyncTask#resolve()] args", {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName
    });
    if (this.#state === _AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}]  is already resolved (did you forget to wait for an import?)`);
    }
    if (this.borrowedHandles.length > 0) {
      throw new Error("task still has borrow handles");
    }
    this.#state = _AsyncTask.State.RESOLVED;
    switch (results.length) {
      case 0:
        this.onResolve(void 0);
        break;
      case 1:
        this.onResolve(results[0]);
        break;
      default:
        _debugLog("[AsyncTask#resolve()] unexpected number of results", {
          componentIdx: this.#componentIdx,
          results,
          taskID: this.#id,
          subtaskID: this.#parentSubtask?.id(),
          entryFnName: this.#entryFnName,
          callbackFnName: this.#callbackFnName
        });
        throw new Error("unexpected number of results");
    }
  }
  exit() {
    _debugLog("[AsyncTask#exit()]", {
      componentIdx: this.#componentIdx,
      taskID: this.#id
    });
    if (this.#exited) {
      throw new Error("task has already exited");
    }
    if (this.#state !== _AsyncTask.State.RESOLVED) {
      _debugLog("[AsyncTask#exit()] task exited without resolution", {
        componentIdx: this.#componentIdx,
        taskID: this.#id,
        subtask: this.getParentSubtask(),
        subtaskID: this.getParentSubtask()?.id()
      });
      this.#state = _AsyncTask.State.RESOLVED;
    }
    if (this.borrowedHandles > 0) {
      throw new Error("task [${this.#id}] exited without clearing borrowed handles");
    }
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) {
      throw new Error("missing async state for component [" + this.#componentIdx + "]");
    }
    if (this.#componentIdx !== -1 && this.needsExclusiveLock() && !state.isExclusivelyLocked()) {
      throw new Error(`task [${this.#id}] exit: component [${this.#componentIdx}] should have been exclusively locked`);
    }
    state.exclusiveRelease();
    for (const f of this.#onExitHandlers) {
      try {
        f();
      } catch (err) {
        console.error("error during task exit handler", err);
        throw err;
      }
    }
    this.#exited = true;
    clearCurrentTask(this.#componentIdx, this.id());
  }
  needsExclusiveLock() {
    return !this.#isAsync || this.hasCallback();
  }
  createSubtask(args) {
    _debugLog("[AsyncTask#createSubtask()] args", args);
    const { componentIdx: componentIdx2, childTask, callMetadata, fnName, isAsync, isManualAsync } = args;
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (!cstate) {
      throw new Error(`invalid/missing async state for component idx [${componentIdx2}]`);
    }
    const waitable = new Waitable({
      componentIdx: this.#componentIdx,
      target: `subtask (internal ID [${this.#id}])`
    });
    const newSubtask = new AsyncSubtask({
      componentIdx: componentIdx2,
      childTask,
      parentTask: this,
      callMetadata,
      isAsync,
      isManualAsync,
      fnName,
      waitable
    });
    this.#subtasks.push(newSubtask);
    newSubtask.setTarget(`subtask (internal ID [${newSubtask.id()}], waitable [${waitable.idx()}], component [${componentIdx2}])`);
    waitable.setIdx(cstate.handles.insert(newSubtask));
    waitable.setTarget(`waitable for subtask (waitable id [${waitable.idx()}], subtask internal ID [${newSubtask.id()}])`);
    return newSubtask;
  }
  getLatestSubtask() {
    return this.#subtasks.at(-1);
  }
  getSubtaskByWaitableRep(rep3) {
    if (rep3 === void 0) {
      throw new TypeError("missing rep");
    }
    return this.#subtasks.find((s) => s.waitableRep() === rep3);
  }
  currentSubtask() {
    _debugLog("[AsyncTask#currentSubtask()]");
    if (this.#subtasks.length === 0) {
      return void 0;
    }
    return this.#subtasks.at(-1);
  }
  removeSubtask(subtask) {
    if (this.#subtasks.length === 0) {
      throw new Error("cannot end current subtask: no current subtask");
    }
    this.#subtasks = this.#subtasks.filter((t) => t !== subtask);
    return subtask;
  }
};
function _lowerImportBackwardsCompat(args) {
  const params2 = [...arguments].slice(1);
  _debugLog("[_lowerImportBackwardsCompat()] args", { args, params: params2 });
  const {
    functionIdx,
    componentIdx: componentIdx2,
    isAsync,
    isManualAsync,
    paramLiftFns,
    resultLowerFns,
    funcTypeIsAsync,
    metadata,
    memoryIdx,
    getMemoryFn,
    getReallocFn,
    importFn
  } = args;
  let meta = _getGlobalCurrentTaskMeta(componentIdx2);
  let createdTask;
  if (!meta) {
    if (funcTypeIsAsync || isAsync && !isManualAsync) {
      throw new Error("p3 async wasm exports cannot use backwards compat auto-task init");
    }
    const [newTask, newTaskID] = createNewCurrentTask({
      componentIdx: componentIdx2,
      isAsync,
      isManualAsync,
      callingWasmExport: false
    });
    createdTask = newTask;
    createdTask.registerOnResolveHandler(() => {
      _clearCurrentTask({
        taskID: task.id(),
        componentIdx: task.componentIdx()
      });
    });
    _setGlobalCurrentTaskMeta({
      componentIdx: componentIdx2,
      taskID: newTaskID
    });
    meta = _getGlobalCurrentTaskMeta(componentIdx2);
  }
  const { taskID } = meta;
  const taskMeta = getCurrentTask(componentIdx2, taskID);
  if (!taskMeta) {
    throw new Error("invalid/missing async task meta");
  }
  const task = taskMeta.task;
  if (!task) {
    throw new Error("invalid/missing async task");
  }
  const cstate = getOrCreateAsyncState(componentIdx2);
  if (!task.mayBlock() && funcTypeIsAsync && !isAsync) {
    throw new Error("non async exports cannot synchronously call async functions");
  }
  const memory2 = getMemoryFn();
  const subtask = task.createSubtask({
    componentIdx: componentIdx2,
    parentTask: task,
    fnName: importFn.fnName,
    isAsync,
    isManualAsync,
    callMetadata: {
      memoryIdx,
      memory: memory2,
      realloc: getReallocFn(),
      resultPtr: params2[0],
      lowers: resultLowerFns
    }
  });
  task.setReturnMemoryIdx(memoryIdx);
  task.setReturnMemory(getMemoryFn());
  subtask.onStart();
  if (!isManualAsync && !isAsync && !funcTypeIsAsync) {
    if (createdTask) {
      createdTask.enterSync();
    }
    const res = importFn(...params2);
    if (!funcTypeIsAsync && !subtask.isReturned()) {
      throw new Error("post-execution subtasks must either be async or returned");
    }
    const syncRes = subtask.getResult();
    if (createdTask) {
      createdTask.resolve([syncRes]);
    }
    return syncRes;
  }
  if (!isManualAsync && !isAsync && funcTypeIsAsync) {
    const { promise, resolve: resolve2 } = new Promise();
    queueMicrotask(async () => {
      if (!subtask.isResolvedState()) {
        await task.suspendUntil({ readyFn: () => task.isResolvedState() });
      }
      resolve2(subtask.getResult());
    });
    return promise;
  }
  const subtaskState = subtask.getStateNumber();
  if (subtaskState < 0 || subtaskState > 2 ** 5) {
    throw new Error("invalid subtask state, out of valid range");
  }
  subtask.setOnProgressFn(() => {
    subtask.setPendingEvent(() => {
      if (subtask.isResolved()) {
        subtask.deliverResolve();
      }
      const event = {
        code: ASYNC_EVENT_CODE.SUBTASK,
        payload0: subtask.waitableRep(),
        payload1: subtask.getStateNumber()
      };
      return event;
    });
  });
  const requiresManualAsyncResult = !isAsync && !funcTypeIsAsync && isManualAsync;
  let manualAsyncResult;
  if (requiresManualAsyncResult) {
    manualAsyncResult = promiseWithResolvers();
  }
  queueMicrotask(async () => {
    try {
      _debugLog("[_lowerImportBackwardsCompat()] calling lowered import", { importFn, params: params2 });
      if (createdTask) {
        await createdTask.enter();
      }
      const asyncRes = await importFn(...params2);
      if (requiresManualAsyncResult) {
        manualAsyncResult.resolve(subtask.getResult());
      }
      if (createdTask) {
        createdTask.resolve([asyncRes]);
      }
    } catch (err) {
      _debugLog("[_lowerImportBackwardsCompat()] import fn error:", err);
      if (requiresManualAsyncResult) {
        manualAsyncResult.reject(err);
      }
      throw err;
    }
  });
  if (requiresManualAsyncResult) {
    return manualAsyncResult.promise;
  }
  return Number(subtask.waitableRep()) << 4 | subtaskState;
}
function _liftFlatU8(ctx) {
  _debugLog("[_liftFlatU8()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least a single i32 argument");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < ctx.storagePtr + 1) {
    throw new Error("not enough storage remaining for lift");
  }
  val = new DataView(ctx.memory.buffer).getUint8(ctx.storagePtr, true);
  ctx.storagePtr += 1;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 1;
  }
  return [val, ctx];
}
function _liftFlatU16(ctx) {
  _debugLog("[_liftFlatU16()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (params.length === 0) {
      throw new Error("expected at least a single i32 argument");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < ctx.storagePtr + 2) {
    throw new Error("not enough storage remaining for lift");
  }
  val = new DataView(ctx.memory.buffer).getUint16(ctx.storagePtr, true);
  ctx.storagePtr += 2;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 2;
  }
  const rem = ctx.storagePtr % 2;
  if (rem !== 0) {
    ctx.storagePtr += 2 - rem;
  }
  return [val, ctx];
}
function _liftFlatU32(ctx) {
  _debugLog("[_liftFlatU32()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least a single i34 argument");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < ctx.storagePtr + 4) {
    throw new Error("not enough storage remaining for lift");
  }
  val = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
  ctx.storagePtr += 4;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 4;
  }
  return [val, ctx];
}
function _liftFlatU64(ctx) {
  _debugLog("[_liftFlatU64()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least one single i64 argument");
    }
    if (typeof ctx.params[0] !== "bigint") {
      throw new Error("expected bigint");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < ctx.storagePtr + 8) {
    throw new Error("not enough storage remaining for lift");
  }
  val = new DataView(ctx.memory.buffer).getBigUint64(ctx.storagePtr, true);
  ctx.storagePtr += 8;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 8;
  }
  return [val, ctx];
}
function _liftFlatStringUTF8(ctx) {
  _debugLog("[_liftFlatStringUTF8()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length < 2) {
      throw new Error("expected at least two u32 arguments");
    }
    const offset = ctx.params[0];
    if (!Number.isSafeInteger(offset)) {
      throw new Error("invalid offset");
    }
    const len2 = ctx.params[1];
    if (!Number.isSafeInteger(len2)) {
      throw new Error("invalid len");
    }
    val = TEXT_DECODER_UTF8.decode(new DataView(ctx.memory.buffer, offset, len2));
    ctx.params = ctx.params.slice(2);
    return [val, ctx];
  }
  const start = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
  const codeUnits = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr + 4, true);
  val = TEXT_DECODER_UTF8.decode(new Uint8Array(ctx.memory.buffer, start, codeUnits));
  ctx.storagePtr += 8;
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) {
    ctx.storagePtr += 4 - rem;
  }
  return [val, ctx];
}
function _liftFlatVariant(casesAndLiftFns) {
  return function _liftFlatVariantInner(ctx) {
    _debugLog("[_liftFlatVariant()] args", { ctx });
    const origUseParams = ctx.useDirectParams;
    let caseIdx;
    let liftRes;
    const originalPtr = ctx.storagePtr;
    const numCases = casesAndLiftFns.length;
    if (casesAndLiftFns.length < 256) {
      liftRes = _liftFlatU8(ctx);
    } else if (numCases >= 256 && numCases < 65536) {
      liftRes = _liftFlatU16(ctx);
    } else if (numCases >= 65536 && numCases < 4294967296) {
      liftRes = _liftFlatU32(ctx);
    } else {
      throw new Error(`unsupported number of variant cases [${numCases}]`);
    }
    caseIdx = liftRes[0];
    ctx = liftRes[1];
    const [tag, liftFn, size32, align32, payloadOffset32] = casesAndLiftFns[caseIdx];
    if (payloadOffset32 === void 0) {
      throw new Error("unexpectedly missing payload offset");
    }
    if (originalPtr !== void 0) {
      ctx.storagePtr = originalPtr + payloadOffset32;
    }
    let val;
    if (liftFn === null) {
      val = { tag };
      ctx.storagePtr = originalPtr + size32;
    } else {
      const [newVal, newCtx] = liftFn(ctx);
      val = { tag, val: newVal };
      ctx = newCtx;
      if (ctx.storagePtr < originalPtr + size32) {
        ctx.storagePtr = originalPtr + size32;
      }
    }
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      ctx.storagePtr += align32 - rem;
    }
    return [val, ctx];
  };
}
function _liftFlatList(meta) {
  const { elemLiftFn, align32, knownLen } = meta;
  const readValuesAndReset = (ctx, originalPtr, dataPtr, len2) => {
    ctx.storagePtr = dataPtr;
    const val = [];
    for (var i = 0; i < len2; i++) {
      const [res, nextCtx] = elemLiftFn(ctx);
      val.push(res);
      ctx = nextCtx;
      const rem = ctx.storagePtr % align32;
      if (rem !== 0) {
        ctx.storagePtr += align32 - rem;
      }
    }
    if (originalPtr !== null) {
      ctx.storagePtr = originalPtr;
    }
    return [val, ctx];
  };
  return function _liftFlatListInner(ctx) {
    _debugLog("[_liftFlatList()] args", { ctx });
    let liftResults;
    if (knownLen) {
      if (ctx.useDirectParams) {
        const dataPtr = ctx.params[0];
        ctx.params = ctx.params.slice(1);
        ctx.useDirectParams = false;
        const originalPtr = ctx.storagePtr;
        ctx.storageLen = 8;
        liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len);
        ctx.useDirectParams = true;
        ctx.storagePtr = null;
        ctx.storageLen = null;
      } else {
        liftResults = readValuesAndReset(ctx, null, ctx.storagePtr, knownLen);
      }
    } else {
      if (ctx.useDirectParams) {
        const dataPtr = ctx.params[0];
        const len2 = ctx.params[1];
        ctx.params = ctx.params.slice(2);
        ctx.useDirectParams = false;
        const originalPtr = ctx.storagePtr;
        ctx.storageLen = 8;
        liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len2);
        ctx.useDirectParams = true;
        ctx.storagePtr = null;
        ctx.storageLen = null;
      } else {
        const dataPtrLiftRes = _liftFlatU32(ctx);
        const dataPtr = dataPtrLiftRes[0];
        ctx = dataPtrLiftRes[1];
        const lenLiftRes = _liftFlatU32(ctx);
        const len2 = lenLiftRes[0];
        ctx = lenLiftRes[1];
        const originalPtr = ctx.storagePtr;
        ctx.storagePtr = dataPtr;
        liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len2);
      }
    }
    return liftResults;
  };
}
function _liftFlatFlags(meta) {
  const { names, size32, align32, intSize } = meta;
  return function _liftFlatFlagsInner(ctx) {
    _debugLog("[_liftFlatFlags()] args", { ctx });
    const val = {};
    let liftRes;
    let align;
    switch (intSize) {
      case 1:
        liftRes = _liftFlatU8(ctx);
        break;
      case 2:
        liftRes = _liftFlatU16(ctx);
        break;
      case 4:
        liftRes = _liftFlatU32(ctx);
        break;
      default:
        throw new Error("invalid flags size");
    }
    let bits = liftRes[0];
    ctx = liftRes[1];
    for (const name of names) {
      val[name] = (bits & 1) === 1;
      bits >>>= 1;
    }
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      ctx.storagePtr += align32 - rem;
    }
    return [val, ctx];
  };
}
function _liftFlatResult(casesAndLiftFns) {
  return function _liftFlatResultInner(ctx) {
    _debugLog("[_liftFlatResult()] args", { ctx });
    return _liftFlatVariant(casesAndLiftFns)(ctx);
  };
}
function _liftFlatBorrow(componentTableIdx, size2, memory2, vals, storagePtr, storageLen) {
  _debugLog("[_liftFlatBorrow()] args", { size: size2, memory: memory2, vals, storagePtr, storageLen });
  throw new Error("flat lift for borrowed resources is not supported!");
}
function _lowerFlatU8(ctx) {
  _debugLog("[_lowerFlatU8()] args", ctx);
  const { memory: memory2, realloc, vals, storagePtr, storageLen } = ctx;
  if (vals.length !== 1) {
    throw new Error("unexpected number (" + vals.length + ") of core vals (expected 1)");
  }
  if (vals[0] > 255 || vals[0] < 0) {
    throw new Error("invalid value for core value representing u8");
  }
  if (!memory2) {
    throw new Error("missing memory for lower");
  }
  new DataView(memory2.buffer).setUint32(storagePtr, vals[0], true);
  return 1;
}
function _lowerFlatU16(memory2, vals, storagePtr, storageLen) {
  _debugLog("[_lowerFlatU16()] args", { memory: memory2, vals, storagePtr, storageLen });
  if (vals.length !== 1) {
    throw new Error("unexpected number (" + vals.length + ") of core vals (expected 1)");
  }
  if (vals[0] > 65535 || vals[0] < 0) {
    throw new Error("invalid value for core value representing u16");
  }
  new DataView(memory2.buffer).setUint16(storagePtr, vals[0], true);
  return 2;
}
function _lowerFlatU32(ctx) {
  _debugLog("[_lowerFlatU32()] args", { ctx });
  const { memory: memory2, realloc, vals, storagePtr, storageLen } = ctx;
  if (vals.length !== 1) {
    throw new Error("expected single value to lower, got (" + vals.length + ")");
  }
  if (vals[0] > 4294967295 || vals[0] < 0) {
    throw new Error("invalid value for core value representing u32");
  }
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) {
    ctx.storagePtr += 4 - rem;
  }
  new DataView(memory2.buffer).setUint32(storagePtr, vals[0], true);
  return 4;
}
function _lowerFlatU64(memory2, vals, storagePtr, storageLen) {
  _debugLog("[_lowerFlatU64()] args", { memory: memory2, vals, storagePtr, storageLen });
  if (vals.length !== 1) {
    throw new Error("unexpected number of core vals");
  }
  if (vals[0] > 18446744073709551615n || vals[0] < 0n) {
    throw new Error("invalid value for core value representing u64");
  }
  new DataView(memory2.buffer).setBigUint64(storagePtr, vals[0], true);
  return 8;
}
function _lowerFlatStringUTF8(ctx) {
  _debugLog("[_lowerFlatStringUTF8()] args", ctx);
  const { memory: memory2, realloc, vals, storagePtr, storageLen } = ctx;
  const s = vals[0];
  const { ptr, len: len2, codepoints } = _utf8AllocateAndEncode(vals[0], realloc, memory2);
  const view = new DataView(memory2.buffer);
  view.setUint32(storagePtr, ptr, true);
  view.setUint32(storagePtr + 4, codepoints, true);
  return len2;
}
function _lowerFlatRecord(fieldMetas) {
  return (size2, memory2, vals, storagePtr, storageLen) => {
    const params2 = [...arguments].slice(5);
    _debugLog("[_lowerFlatRecord()] args", {
      size: size2,
      memory: memory2,
      vals,
      storagePtr,
      storageLen,
      params: params2,
      fieldMetas
    });
    const [start] = vals;
    if (storageLen !== void 0 && size2 !== void 0 && size2 > storageLen) {
      throw new Error("not enough storage remaining for record flat lower");
    }
    const data = new Uint8Array(memory2.buffer, start, size2);
    new Uint8Array(memory2.buffer, storagePtr, size2).set(data);
    return data.byteLength;
  };
}
function _lowerFlatVariant(lowerMetas) {
  return function _lowerFlatVariantInner(ctx) {
    _debugLog("[_lowerFlatVariant()] args", ctx);
    const { memory: memory2, realloc, vals, storageLen, componentIdx: componentIdx2 } = ctx;
    let storagePtr = ctx.storagePtr;
    const { tag, val } = vals[0];
    const disc = lowerMetas.findIndex((m) => m[0] === tag);
    if (disc === -1) {
      throw new Error(`invalid variant tag/discriminant [${tag}] (valid tags: ${variantMetas.map((m) => m[0])})`);
    }
    const [_tag, lowerFn, size32, align32, payloadOffset32] = lowerMetas[disc];
    const originalPtr = ctx.resultPtr;
    ctx.vals = [disc];
    let discLowerRes;
    if (lowerMetas.length < 256) {
      discLowerRes = _lowerFlatU8(ctx);
    } else if (lowerMetas.length >= 256 && lowerMetas.length < 65536) {
      discLowerRes = _lowerFlatU16(ctx);
    } else if (lowerMetas.length >= 65536 && lowerMetas.length < 4294967296) {
      discLowerRes = _lowerFlatU32(ctx);
    } else {
      throw new Error("unsupported number of cases [" + lowerMetas.legnth + "]");
    }
    ctx.resultPtr = originalPtr + payloadOffset32;
    let payloadBytesWritten = 0;
    if (lowerFn) {
      lowerFn({
        memory: memory2,
        realloc,
        vals: [val],
        storagePtr,
        storageLen,
        componentIdx: componentIdx2
      });
    }
    let bytesWritten = payloadOffset + payloadBytesWritten;
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      const pad = align32 - rem;
      ctx.storagePtr += pad;
      bytesWritten += pad;
    }
    return bytesWritten;
  };
}
function _lowerFlatList(args) {
  const { elemLowerFn } = args;
  if (!elemLowerFn) {
    throw new TypeError("missing/invalid element lower fn for list");
  }
  return function _lowerFlatListInner(ctx) {
    _debugLog("[_lowerFlatList()] args", { ctx });
    if (ctx.params.length < 2) {
      throw new Error("insufficient params left to lower list");
    }
    const storagePtr = ctx.params[0];
    const elemCount = ctx.params[1];
    ctx.params = ctx.params.slice(2);
    if (ctx.useDirectParams) {
      const list = ctx.vals[0];
      if (!list) {
        throw new Error("missing direct param value");
      }
      const elemLowerCtx = { storagePtr, memory: ctx.memory };
      for (let idx = 0; idx < list.length; idx++) {
        elemLowerCtx.vals = list.slice(idx, idx + 1);
        elemLowerCtx.storagePtr += elemLowerFn(elemLowerCtx);
      }
      const bytesLowered = elemLowerCtx.storagePtr - ctx.storagePtr;
      ctx.storagePtr = elemLowerCtx.storagePtr;
      return bytesLowered;
    }
    if (ctx.vals.length !== 2) {
      throw new Error("indirect parameter loading must have a pointer and length as vals");
    }
    let [valStartPtr, valLen] = ctx.vals;
    const totalSizeBytes = valLen * size;
    if (ctx.storageLen !== void 0 && totalSizeBytes > ctx.storageLen) {
      throw new Error("not enough storage remaining for list flat lower");
    }
    const data = new Uint8Array(memory.buffer, valStartPtr, totalSizeBytes);
    new Uint8Array(memory.buffer, storagePtr, totalSizeBytes).set(data);
    return totalSizeBytes;
  };
}
function _lowerFlatTuple(size2, memory2, vals, storagePtr, storageLen) {
  _debugLog("[_lowerFlatTuple()] args", { size: size2, memory: memory2, vals, storagePtr, storageLen });
  let [start, len2] = vals;
  if (storageLen !== void 0 && len2 > storageLen) {
    throw new Error("not enough storage remaining for tuple flat lower");
  }
  const data = new Uint8Array(memory2.buffer, start, len2);
  new Uint8Array(memory2.buffer, storagePtr, len2).set(data);
  return data.byteLength;
}
function _lowerFlatEnum(size2, memory2, vals, storagePtr, storageLen) {
  _debugLog("[_lowerFlatEnum()] args", { size: size2, memory: memory2, vals, storagePtr, storageLen });
  let [start] = vals;
  if (storageLen !== void 0 && size2 !== void 0 && size2 > storageLen) {
    throw new Error("not enough storage remaining for enum flat lower");
  }
  const data = new Uint8Array(memory2.buffer, start, size2);
  new Uint8Array(memory2.buffer, storagePtr, size2).set(data);
  return data.byteLength;
}
function _lowerFlatOption(lowerMetas) {
  function _lowerFlatOptionInner(ctx) {
    _debugLog("[_lowerFlatOption()] args", { ctx });
    return _lowerFlatVariant(lowerMetas)(ctx);
  }
}
function _lowerFlatResult(lowerMetas) {
  return function _lowerFlatResultInner(ctx) {
    _debugLog("[_lowerFlatResult()] args", { lowerMetas });
    return _lowerFlatVariant(lowerMetas)(ctx);
  };
}
function _lowerFlatOwn(size2, memory2, vals, storagePtr, storageLen) {
  _debugLog("[_lowerFlatOwn()] args", { size: size2, memory: memory2, vals, storagePtr, storageLen });
  throw new Error("flat lower for owned resources not yet implemented!");
}
var STREAMS = new RepTable({ target: "global stream map" });
var ASYNC_STATE = /* @__PURE__ */ new Map();
function getOrCreateAsyncState(componentIdx2, init) {
  if (!ASYNC_STATE.has(componentIdx2)) {
    const newState = new ComponentAsyncState({ componentIdx: componentIdx2 });
    ASYNC_STATE.set(componentIdx2, newState);
  }
  return ASYNC_STATE.get(componentIdx2);
}
var ComponentAsyncState = class _ComponentAsyncState {
  static EVENT_HANDLER_EVENTS = ["backpressure-change"];
  #componentIdx;
  #callingAsyncImport = false;
  #syncImportWait = promiseWithResolvers();
  #locked = false;
  #parkedTasks = /* @__PURE__ */ new Map();
  #suspendedTasksByTaskID = /* @__PURE__ */ new Map();
  #suspendedTaskIDs = [];
  #errored = null;
  #backpressure = 0;
  #backpressureWaiters = 0n;
  #handlerMap = /* @__PURE__ */ new Map();
  #nextHandlerID = 0n;
  #tickLoop = null;
  #tickLoopInterval = null;
  #onExclusiveReleaseHandlers = [];
  mayLeave = true;
  handles;
  subtasks;
  constructor(args) {
    this.#componentIdx = args.componentIdx;
    this.handles = new RepTable({ target: `component [${this.#componentIdx}] handles (waitable objects)` });
    this.subtasks = new RepTable({ target: `component [${this.#componentIdx}] subtasks` });
  }
  componentIdx() {
    return this.#componentIdx;
  }
  errored() {
    return this.#errored !== null;
  }
  setErrored(err) {
    _debugLog("[ComponentAsyncState#setErrored()] component errored", { err, componentIdx: this.#componentIdx });
    if (this.#errored) {
      return;
    }
    if (!err) {
      err = new Error("error elswehere (see other component instance error)");
      err.componentIdx = this.#componentIdx;
    }
    this.#errored = err;
  }
  callingSyncImport(val) {
    if (val === void 0) {
      return this.#callingAsyncImport;
    }
    if (typeof val !== "boolean") {
      throw new TypeError("invalid setting for async import");
    }
    const prev = this.#callingAsyncImport;
    this.#callingAsyncImport = val;
    if (prev === true && this.#callingAsyncImport === false) {
      this.#notifySyncImportEnd();
    }
  }
  #notifySyncImportEnd() {
    const existing = this.#syncImportWait;
    this.#syncImportWait = promiseWithResolvers();
    existing.resolve();
  }
  async waitForSyncImportCallEnd() {
    await this.#syncImportWait.promise;
  }
  setBackpressure(v) {
    this.#backpressure = v;
    return this.#backpressure;
  }
  getBackpressure() {
    return this.#backpressure;
  }
  incrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2 ** 16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = this.getBackpressure() + 1;
    if (newValue >= 2 ** 16) {
      throw new Error(`invalid new backpressure value [${newValue}], overflow`);
    }
    return this.setBackpressure(newValue);
  }
  decrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2 ** 16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = Math.max(0, current - 1);
    if (newValue < 0) {
      throw new Error(`invalid new backpressure value [${newValue}], underflow`);
    }
    return this.setBackpressure(newValue);
  }
  hasBackpressure() {
    return this.#backpressure > 0;
  }
  waitForBackpressure() {
    let backpressureCleared = false;
    const cstate = this;
    cstate.addBackpressureWaiter();
    const handlerID = this.registerHandler({
      event: "backpressure-change",
      fn: (bp) => {
        if (bp === 0) {
          cstate.removeHandler(handlerID);
          backpressureCleared = true;
        }
      }
    });
    return new Promise((resolve2) => {
      const interval = setInterval(() => {
        if (backpressureCleared) {
          return;
        }
        clearInterval(interval);
        cstate.removeBackpressureWaiter();
        resolve2(null);
      }, 0);
    });
  }
  registerHandler(args) {
    const { event, fn } = args;
    if (!event) {
      throw new Error("missing handler event");
    }
    if (!fn) {
      throw new Error("missing handler fn");
    }
    if (!_ComponentAsyncState.EVENT_HANDLER_EVENTS.includes(event)) {
      throw new Error(`unrecognized event handler [${event}]`);
    }
    const handlerID = this.#nextHandlerID++;
    let handlers = this.#handlerMap.get(event);
    if (!handlers) {
      handlers = [];
      this.#handlerMap.set(event, handlers);
    }
    handlers.push({ id: handlerID, fn, event });
    return handlerID;
  }
  removeHandler(args) {
    const { event, handlerID } = args;
    const registeredHandlers = this.#handlerMap.get(event);
    if (!registeredHandlers) {
      return;
    }
    const found = registeredHandlers.find((h) => h.id === handlerID);
    if (!found) {
      return;
    }
    this.#handlerMap.set(event, this.#handlerMap.get(event).filter((h) => h.id !== handlerID));
  }
  getBackpressureWaiters() {
    return this.#backpressureWaiters;
  }
  addBackpressureWaiter() {
    this.#backpressureWaiters++;
  }
  removeBackpressureWaiter() {
    this.#backpressureWaiters--;
    if (this.#backpressureWaiters < 0) {
      throw new Error("unexepctedly negative number of backpressure waiters");
    }
  }
  isExclusivelyLocked() {
    return this.#locked === true;
  }
  setLocked(locked) {
    this.#locked = locked;
  }
  // TODO(fix): we might want to check for pre-locked status here, we should be deterministically
  // going from locked -> unlocked and vice versa
  exclusiveLock() {
    _debugLog("[ComponentAsyncState#exclusiveLock()]", {
      locked: this.#locked,
      componentIdx: this.#componentIdx
    });
    this.setLocked(true);
  }
  exclusiveRelease() {
    _debugLog("[ComponentAsyncState#exclusiveRelease()] args", {
      locked: this.#locked,
      componentIdx: this.#componentIdx
    });
    this.setLocked(false);
    this.#onExclusiveReleaseHandlers = this.#onExclusiveReleaseHandlers.filter((v) => !!v);
    for (const [idx, f] of this.#onExclusiveReleaseHandlers.entries()) {
      try {
        this.#onExclusiveReleaseHandlers[idx] = null;
        f();
      } catch (err) {
        _debugLog("error while executing handler for next exclusive release", err);
        throw err;
      }
    }
  }
  onNextExclusiveRelease(fn) {
    _debugLog("[ComponentAsyncState#()onNextExclusiveRelease] registering");
    this.#onExclusiveReleaseHandlers.push(fn);
  }
  #getSuspendedTaskMeta(taskID) {
    return this.#suspendedTasksByTaskID.get(taskID);
  }
  #removeSuspendedTaskMeta(taskID) {
    _debugLog("[ComponentAsyncState#removeSuspendedTaskMeta()] removing suspended task", { taskID });
    const idx = this.#suspendedTaskIDs.findIndex((t) => t === taskID);
    const meta = this.#suspendedTasksByTaskID.get(taskID);
    this.#suspendedTaskIDs[idx] = null;
    this.#suspendedTasksByTaskID.delete(taskID);
    return meta;
  }
  #addSuspendedTaskMeta(meta) {
    if (!meta) {
      throw new Error("missing task meta");
    }
    const taskID = meta.taskID;
    this.#suspendedTasksByTaskID.set(taskID, meta);
    this.#suspendedTaskIDs.push(taskID);
    if (this.#suspendedTasksByTaskID.size < this.#suspendedTaskIDs.length - 10) {
      this.#suspendedTaskIDs = this.#suspendedTaskIDs.filter((t) => t !== null);
    }
  }
  // TODO(threads): readyFn is normally on the thread
  suspendTask(args) {
    const { task, readyFn } = args;
    const taskID = task.id();
    _debugLog("[ComponentAsyncState#suspendTask()]", {
      taskID,
      componentIdx: this.#componentIdx,
      taskEntryFnName: task.entryFnName(),
      subtask: task.getParentSubtask()
    });
    if (this.#getSuspendedTaskMeta(taskID)) {
      throw new Error(`task [${taskID}] already suspended`);
    }
    const { promise, resolve: resolve2, reject: reject2 } = promiseWithResolvers();
    this.#addSuspendedTaskMeta({
      task,
      taskID,
      readyFn,
      resume: () => {
        _debugLog("[ComponentAsyncState#suspendTask()] resuming suspended task", { taskID });
        resolve2(!task.isCancelled());
      }
    });
    this.runTickLoop();
    return promise;
  }
  resumeTaskByID(taskID) {
    const meta = this.#removeSuspendedTaskMeta(taskID);
    if (!meta) {
      return;
    }
    if (meta.taskID !== taskID) {
      throw new Error("task ID does not match");
    }
    meta.resume();
  }
  async runTickLoop() {
    if (this.#tickLoop !== null) {
      return;
    }
    this.#tickLoop = 1;
    setTimeout(async () => {
      let done = this.tick();
      while (!done) {
        await new Promise((resolve2) => setTimeout(resolve2, 30));
        done = this.tick();
      }
      this.#tickLoop = null;
    }, 10);
  }
  tick() {
    const resumableTasks = this.#suspendedTaskIDs.filter((t) => t !== null);
    for (const taskID of resumableTasks) {
      const meta = this.#suspendedTasksByTaskID.get(taskID);
      if (!meta || !meta.readyFn) {
        throw new Error(`missing/invalid task despite ID [${taskID}] being present`);
      }
      if (meta.task.isRejected()) {
        _debugLog("[ComponentAsyncState#suspendTask()] detected task rejection, leaving early", { meta });
        this.resumeTaskByID(taskID);
        return;
      }
      const isReady = meta.readyFn();
      if (!isReady) {
        continue;
      }
      this.resumeTaskByID(taskID);
    }
    return this.#suspendedTaskIDs.filter((t) => t !== null).length === 0;
  }
  addStreamEndToTable(args) {
    _debugLog("[ComponentAsyncState#addStreamEnd()] args", args);
    const { tableIdx, streamEnd } = args;
    if (typeof streamEnd === "number") {
      throw new Error("INSERTING BAD STREAMEND");
    }
    let { table, componentIdx: componentIdx2 } = STREAM_TABLES[tableIdx];
    if (componentIdx2 === void 0 || !table) {
      throw new Error(`invalid global stream table state for table [${tableIdx}]`);
    }
    const handle = table.insert(streamEnd);
    streamEnd.setHandle(handle);
    streamEnd.setStreamTableIdx(tableIdx);
    const cstate = getOrCreateAsyncState(componentIdx2);
    const waitableIdx = cstate.handles.insert(streamEnd);
    streamEnd.setWaitableIdx(waitableIdx);
    _debugLog("[ComponentAsyncState#addStreamEnd()] added stream end", {
      tableIdx,
      table,
      handle,
      streamEnd,
      destComponentIdx: componentIdx2
    });
    return { handle, waitableIdx };
  }
  createWaitable(args) {
    return new Waitable({ target: args?.target });
  }
  createStream(args) {
    _debugLog("[ComponentAsyncState#createStream()] args", args);
    const { tableIdx, elemMeta } = args;
    if (tableIdx === void 0) {
      throw new Error("missing table idx while adding stream");
    }
    if (elemMeta === void 0) {
      throw new Error("missing element metadata while adding stream");
    }
    const { table: localStreamTable, componentIdx: componentIdx2 } = STREAM_TABLES[tableIdx];
    if (!localStreamTable) {
      throw new Error(`missing global stream table lookup for table [${tableIdx}] while creating stream`);
    }
    if (componentIdx2 !== this.#componentIdx) {
      throw new Error("component idx mismatch while creating stream");
    }
    const readWaitable = this.createWaitable();
    const writeWaitable = this.createWaitable();
    const stream = new InternalStream({
      tableIdx,
      componentIdx: this.#componentIdx,
      elemMeta,
      readWaitable,
      writeWaitable
    });
    stream.setGlobalStreamMapRep(STREAMS.insert(stream));
    const writeEnd = stream.writeEnd();
    writeEnd.setWaitableIdx(this.handles.insert(writeEnd));
    writeEnd.setHandle(localStreamTable.insert(writeEnd));
    if (writeEnd.streamTableIdx() !== tableIdx) {
      throw new Error("unexpectedly mismatched stream table");
    }
    const writeEndWaitableIdx = writeEnd.waitableIdx();
    const writeEndHandle = writeEnd.handle();
    writeWaitable.setTarget(`waitable for stream write end (waitable [${writeEndWaitableIdx}])`);
    writeEnd.setTarget(`stream write end (waitable [${writeEndWaitableIdx}])`);
    const readEnd = stream.readEnd();
    readEnd.setWaitableIdx(this.handles.insert(readEnd));
    readEnd.setHandle(localStreamTable.insert(readEnd));
    if (readEnd.streamTableIdx() !== tableIdx) {
      throw new Error("unexpectedly mismatched stream table");
    }
    const readEndWaitableIdx = readEnd.waitableIdx();
    const readEndHandle = readEnd.handle();
    readWaitable.setTarget(`waitable for read end (waitable [${readEndWaitableIdx}])`);
    readEnd.setTarget(`stream read end (waitable [${readEndWaitableIdx}])`);
    return {
      writeEndWaitableIdx,
      writeEndHandle,
      readEndWaitableIdx,
      readEndHandle
    };
  }
  getStreamEnd(args) {
    _debugLog("[ComponentAsyncState#getStreamEnd()] args", args);
    const { tableIdx, streamEndHandle, streamEndWaitableIdx } = args;
    if (tableIdx === void 0) {
      throw new Error("missing table idx while getting stream end");
    }
    const { table, componentIdx: componentIdx2 } = STREAM_TABLES[tableIdx];
    const cstate = getOrCreateAsyncState(componentIdx2);
    let streamEnd;
    if (streamEndWaitableIdx !== void 0) {
      streamEnd = cstate.handles.get(streamEndWaitableIdx);
    } else if (streamEndHandle !== void 0) {
      if (!table) {
        throw new Error(`missing/invalid table [${tableIdx}] while getting stream end`);
      }
      streamEnd = table.get(streamEndHandle);
    } else {
      throw new TypeError("must specify either waitable idx or handle to retrieve stream");
    }
    if (!streamEnd) {
      throw new Error(`missing stream end (tableIdx [${tableIdx}], handle [${streamEndHandle}], waitableIdx [${streamEndWaitableIdx}])`);
    }
    if (tableIdx && streamEnd.streamTableIdx() !== tableIdx) {
      throw new Error(`stream end table idx [${streamEnd.streamTableIdx()}] does not match [${tableIdx}]`);
    }
    return streamEnd;
  }
  deleteStreamEnd(args) {
    _debugLog("[ComponentAsyncState#deleteStreamEnd()] args", args);
    const { tableIdx, streamEndWaitableIdx } = args;
    if (tableIdx === void 0) {
      throw new Error("missing table idx while removing stream end");
    }
    if (streamEndWaitableIdx === void 0) {
      throw new Error("missing stream idx while removing stream end");
    }
    const { table, componentIdx: componentIdx2 } = STREAM_TABLES[tableIdx];
    const cstate = getOrCreateAsyncState(componentIdx2);
    const streamEnd = cstate.handles.get(streamEndWaitableIdx);
    if (!streamEnd) {
      throw new Error(`missing stream end [${streamEndWaitableIdx}] in component handles while deleting stream`);
    }
    if (streamEnd.streamTableIdx() !== tableIdx) {
      throw new Error(`stream end table idx [${streamEnd.streamTableIdx()}] does not match [${tableIdx}]`);
    }
    let removed = cstate.handles.remove(streamEnd.waitableIdx());
    if (!removed) {
      throw new Error(`failed to remove stream end [${streamEndWaitableIdx}] waitable obj in component [${componentIdx2}]`);
    }
    removed = table.remove(streamEnd.handle());
    if (!removed) {
      throw new Error(`failed to remove stream end with handle [${streamEnd.handle()}] from stream table [${tableIdx}] in component [${componentIdx2}]`);
    }
    return streamEnd;
  }
  removeStreamEndFromTable(args) {
    _debugLog("[ComponentAsyncState#removeStreamEndFromTable()] args", args);
    const { tableIdx, streamWaitableIdx } = args;
    if (tableIdx === void 0) {
      throw new Error("missing table idx while removing stream end");
    }
    if (streamWaitableIdx === void 0) {
      throw new Error("missing stream end waitable idx while removing stream end");
    }
    const { table, componentIdx: componentIdx2 } = STREAM_TABLES[tableIdx];
    if (!table) {
      throw new Error(`missing/invalid table [${tableIdx}] while removing stream end`);
    }
    const cstate = getOrCreateAsyncState(componentIdx2);
    const streamEnd = cstate.handles.get(streamWaitableIdx);
    if (!streamEnd) {
      throw new Error(`missing stream end (handle [${streamWaitableIdx}], table [${tableIdx}])`);
    }
    const handle = streamEnd.handle();
    let removed = cstate.handles.remove(streamWaitableIdx);
    if (!removed) {
      throw new Error(`failed to remove streamEnd from handles (waitable idx [${streamWaitableIdx}]), component [${componentIdx2}])`);
    }
    removed = table.remove(handle);
    if (!removed) {
      throw new Error(`failed to remove streamEnd from table (handle [${handle}]), table [${tableIdx}], component [${componentIdx2}])`);
    }
    return streamEnd;
  }
};
var base64Compile = (str) => WebAssembly.compile(typeof Buffer !== "undefined" ? Buffer.from(str, "base64") : Uint8Array.from(atob(str), (b) => b.charCodeAt(0)));
var isNode = typeof process !== "undefined" && process.versions && process.versions.node;
var _fs;
async function fetchCompile(url) {
  if (isNode) {
    _fs = _fs || await import("node:fs/promises");
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}
var symbolCabiDispose = /* @__PURE__ */ Symbol.for("cabiDispose");
var symbolRscHandle = /* @__PURE__ */ Symbol("handle");
var symbolRscRep = /* @__PURE__ */ Symbol.for("cabiRep");
var handleTables = [];
var ComponentError = class extends Error {
  constructor(value) {
    const enumerable = typeof value !== "string";
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, "payload", { value, enumerable });
  }
};
function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, "payload")) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var instantiateCore = WebAssembly.instantiate;
var exports0;
var _trampoline0 = function(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0 = {
        tag: "ok",
        val: void 0
      };
      break;
    }
    case 1: {
      variant0 = {
        tag: "err",
        val: void 0
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  _debugLog('[iface="wasi:cli/exit@0.2.0", function="exit"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "exit",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => exit3(variant0)
  });
  _debugLog('[iface="wasi:cli/exit@0.2.0", function="exit"][Instruction::Return]', {
    funcName: "exit",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline0.fnName = "wasi:cli/exit@0.2.0#exit";
var handleTable2 = [T_FLAG2, 0];
var captureTable2 = /* @__PURE__ */ new Map();
var captureCnt2 = 0;
handleTables[2] = handleTable2;
var _trampoline3 = function() {
  _debugLog('[iface="wasi:cli/stdout@0.2.0", function="get-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getStdout",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStdout()
  });
  if (!(ret instanceof OutputStream3)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep3 = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep3, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep3);
  }
  _debugLog('[iface="wasi:cli/stdout@0.2.0", function="get-stdout"][Instruction::Return]', {
    funcName: "get-stdout",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
};
_trampoline3.fnName = "wasi:cli/stdout@0.2.0#getStdout";
var _trampoline4 = function() {
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.0", function="now"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "now",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => now()
  });
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.0", function="now"][Instruction::Return]', {
    funcName: "now",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([toUint64(ret)]);
  task.exit();
  return toUint64(ret);
};
_trampoline4.fnName = "wasi:clocks/monotonic-clock@0.2.0#now";
var _trampoline5 = function() {
  _debugLog('[iface="wasi:random/random@0.2.0", function="get-random-u64"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getRandomU64",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getRandomU64()
  });
  _debugLog('[iface="wasi:random/random@0.2.0", function="get-random-u64"][Instruction::Return]', {
    funcName: "get-random-u64",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([toUint64(ret)]);
  task.exit();
  return toUint64(ret);
};
_trampoline5.fnName = "wasi:random/random@0.2.0#getRandomU64";
var _trampoline6 = function() {
  _debugLog('[iface="wasi:cli/stderr@0.2.0", function="get-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getStderr",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStderr()
  });
  if (!(ret instanceof OutputStream3)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep3 = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep3, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep3);
  }
  _debugLog('[iface="wasi:cli/stderr@0.2.0", function="get-stderr"][Instruction::Return]', {
    funcName: "get-stderr",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
};
_trampoline6.fnName = "wasi:cli/stderr@0.2.0#getStderr";
var handleTable1 = [T_FLAG2, 0];
var captureTable1 = /* @__PURE__ */ new Map();
var captureCnt1 = 0;
handleTables[1] = handleTable1;
var _trampoline7 = function() {
  _debugLog('[iface="wasi:cli/stdin@0.2.0", function="get-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getStdin",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStdin()
  });
  if (!(ret instanceof InputStream3)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep3 = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep3, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep3);
  }
  _debugLog('[iface="wasi:cli/stdin@0.2.0", function="get-stdin"][Instruction::Return]', {
    funcName: "get-stdin",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
};
_trampoline7.fnName = "wasi:cli/stdin@0.2.0#getStdin";
var exports1;
var memory0;
var realloc0;
var realloc0Async;
var _trampoline10 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="get-environment"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getEnvironment",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getEnvironment()
  });
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;
    var [tuple0_0, tuple0_1] = e;
    var encodeRes = _utf8AllocateAndEncode(tuple0_0, realloc0, memory0);
    var ptr1 = encodeRes.ptr;
    var len1 = encodeRes.len;
    dataView(memory0).setUint32(base + 4, len1, true);
    dataView(memory0).setUint32(base + 0, ptr1, true);
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc0, memory0);
    var ptr2 = encodeRes.ptr;
    var len2 = encodeRes.len;
    dataView(memory0).setUint32(base + 12, len2, true);
    dataView(memory0).setUint32(base + 8, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="get-environment"][Instruction::Return]', {
    funcName: "get-environment",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline10.fnName = "wasi:cli/environment@0.2.0#getEnvironment";
var _trampoline11 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="get-arguments"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getArguments",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getArguments()
  });
  var vec1 = ret;
  var len1 = vec1.length;
  var result1 = realloc0(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;
    var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
    var ptr0 = encodeRes.ptr;
    var len0 = encodeRes.len;
    dataView(memory0).setUint32(base + 4, len0, true);
    dataView(memory0).setUint32(base + 0, ptr0, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len1, true);
  dataView(memory0).setUint32(arg0 + 0, result1, true);
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="get-arguments"][Instruction::Return]', {
    funcName: "get-arguments",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline11.fnName = "wasi:cli/environment@0.2.0#getArguments";
var _trampoline12 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="initial-cwd"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "initialCwd",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => initialCwd()
  });
  var variant1 = ret;
  if (variant1 === null || variant1 === void 0) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
    var ptr0 = encodeRes.ptr;
    var len0 = encodeRes.len;
    dataView(memory0).setUint32(arg0 + 8, len0, true);
    dataView(memory0).setUint32(arg0 + 4, ptr0, true);
  }
  _debugLog('[iface="wasi:cli/environment@0.2.0", function="initial-cwd"][Instruction::Return]', {
    funcName: "initial-cwd",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline12.fnName = "wasi:cli/environment@0.2.0#initialCwd";
var handleTable0 = [T_FLAG2, 0];
var captureTable0 = /* @__PURE__ */ new Map();
var captureCnt0 = 0;
handleTables[0] = handleTable0;
var _trampoline13 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep22 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable1.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(InputStream3.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]input-stream.blocking-read"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "blockingRead",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.blockingRead(BigInt.asUintN(64, BigInt(arg1)))
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = Array.isArray(val3) ? val3.length : val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      let valData3;
      const valLenBytes3 = len3 * 1;
      if (Array.isArray(val3)) {
        let offset = 0;
        const dv3 = new DataView(memory0.buffer);
        for (const v of val3) {
          dv3.setUint8(ptr3 + offset, v, true);
          offset += 1;
        }
      } else {
        valData3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, valLenBytes3);
        const out3 = new Uint8Array(memory0.buffer, ptr3, valLenBytes3);
        out3.set(valData3);
      }
      dataView(memory0).setUint32(arg2 + 8, len3, true);
      dataView(memory0).setUint32(arg2 + 4, ptr3, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case "last-operation-failed": {
          const e2 = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e2[symbolRscHandle];
          if (!handle4) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle4 = rscTableCreateOwn(handleTable0, rep3);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]input-stream.blocking-read"][Instruction::Return]', {
    funcName: "[method]input-stream.blocking-read",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline13.fnName = "wasi:io/streams@0.2.0#blockingRead";
var _trampoline14 = function(arg0, arg1) {
  var handle1 = arg0;
  var rep22 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable2.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream3.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]output-stream.blocking-flush"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "blockingFlush",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.blockingFlush()
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case "last-operation-failed": {
          const e2 = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e2[symbolRscHandle];
          if (!handle3) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle3 = rscTableCreateOwn(handleTable0, rep3);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]output-stream.blocking-flush"][Instruction::Return]', {
    funcName: "[method]output-stream.blocking-flush",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline14.fnName = "wasi:io/streams@0.2.0#blockingFlush";
var _trampoline15 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable2.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream3.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]output-stream.blocking-write-and-flush"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "blockingWriteAndFlush",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.blockingWriteAndFlush(result3)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case "last-operation-failed": {
          const e2 = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e2[symbolRscHandle];
          if (!handle4) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle4 = rscTableCreateOwn(handleTable0, rep3);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.0", function="[method]output-stream.blocking-write-and-flush"][Instruction::Return]', {
    funcName: "[method]output-stream.blocking-write-and-flush",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline15.fnName = "wasi:io/streams@0.2.0#blockingWriteAndFlush";
var _trampoline16 = function(arg0) {
  _debugLog('[iface="wasi:clocks/wall-clock@0.2.0", function="now"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "now$1",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => now$1()
  });
  var { seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
  _debugLog('[iface="wasi:clocks/wall-clock@0.2.0", function="now"][Instruction::Return]', {
    funcName: "now",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline16.fnName = "wasi:clocks/wall-clock@0.2.0#now$1";
var _trampoline17 = function(arg0, arg1) {
  _debugLog('[iface="wasi:random/random@0.2.0", function="get-random-bytes"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getRandomBytes",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getRandomBytes2(BigInt.asUintN(64, BigInt(arg0)))
  });
  var val0 = ret;
  var len0 = Array.isArray(val0) ? val0.length : val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  let valData0;
  const valLenBytes0 = len0 * 1;
  if (Array.isArray(val0)) {
    let offset = 0;
    const dv0 = new DataView(memory0.buffer);
    for (const v of val0) {
      dv0.setUint8(ptr0 + offset, v, true);
      offset += 1;
    }
  } else {
    valData0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, valLenBytes0);
    const out0 = new Uint8Array(memory0.buffer, ptr0, valLenBytes0);
    out0.set(valData0);
  }
  dataView(memory0).setUint32(arg1 + 4, len0, true);
  dataView(memory0).setUint32(arg1 + 0, ptr0, true);
  _debugLog('[iface="wasi:random/random@0.2.0", function="get-random-bytes"][Instruction::Return]', {
    funcName: "get-random-bytes",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline17.fnName = "wasi:random/random@0.2.0#getRandomBytes";
var handleTable3 = [T_FLAG2, 0];
var captureTable3 = /* @__PURE__ */ new Map();
var captureCnt3 = 0;
handleTables[3] = handleTable3;
var _trampoline18 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.create-directory-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "createDirectoryAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.createDirectoryAt(result3)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "access": {
          enum4 = 0;
          break;
        }
        case "would-block": {
          enum4 = 1;
          break;
        }
        case "already": {
          enum4 = 2;
          break;
        }
        case "bad-descriptor": {
          enum4 = 3;
          break;
        }
        case "busy": {
          enum4 = 4;
          break;
        }
        case "deadlock": {
          enum4 = 5;
          break;
        }
        case "quota": {
          enum4 = 6;
          break;
        }
        case "exist": {
          enum4 = 7;
          break;
        }
        case "file-too-large": {
          enum4 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum4 = 9;
          break;
        }
        case "in-progress": {
          enum4 = 10;
          break;
        }
        case "interrupted": {
          enum4 = 11;
          break;
        }
        case "invalid": {
          enum4 = 12;
          break;
        }
        case "io": {
          enum4 = 13;
          break;
        }
        case "is-directory": {
          enum4 = 14;
          break;
        }
        case "loop": {
          enum4 = 15;
          break;
        }
        case "too-many-links": {
          enum4 = 16;
          break;
        }
        case "message-size": {
          enum4 = 17;
          break;
        }
        case "name-too-long": {
          enum4 = 18;
          break;
        }
        case "no-device": {
          enum4 = 19;
          break;
        }
        case "no-entry": {
          enum4 = 20;
          break;
        }
        case "no-lock": {
          enum4 = 21;
          break;
        }
        case "insufficient-memory": {
          enum4 = 22;
          break;
        }
        case "insufficient-space": {
          enum4 = 23;
          break;
        }
        case "not-directory": {
          enum4 = 24;
          break;
        }
        case "not-empty": {
          enum4 = 25;
          break;
        }
        case "not-recoverable": {
          enum4 = 26;
          break;
        }
        case "unsupported": {
          enum4 = 27;
          break;
        }
        case "no-tty": {
          enum4 = 28;
          break;
        }
        case "no-such-device": {
          enum4 = 29;
          break;
        }
        case "overflow": {
          enum4 = 30;
          break;
        }
        case "not-permitted": {
          enum4 = 31;
          break;
        }
        case "pipe": {
          enum4 = 32;
          break;
        }
        case "read-only": {
          enum4 = 33;
          break;
        }
        case "invalid-seek": {
          enum4 = 34;
          break;
        }
        case "text-file-busy": {
          enum4 = 35;
          break;
        }
        case "cross-device": {
          enum4 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.create-directory-at"][Instruction::Return]', {
    funcName: "[method]descriptor.create-directory-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline18.fnName = "wasi:filesystem/types@0.2.0#createDirectoryAt";
var _trampoline19 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  var handle6 = arg4;
  var rep7 = handleTable3[(handle6 << 1) + 1] & ~T_FLAG2;
  var rsc5 = captureTable3.get(rep7);
  if (!rsc5) {
    rsc5 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc5, symbolRscHandle, { writable: true, value: handle6 });
    Object.defineProperty(rsc5, symbolRscRep, { writable: true, value: rep7 });
  }
  curResourceBorrows.push(rsc5);
  var ptr8 = arg5;
  var len8 = arg6;
  var result8 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr8, len8));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.link-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "linkAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.linkAt(flags3, result4, rsc5, result8)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant10 = ret;
  switch (variant10.tag) {
    case "ok": {
      const e = variant10.val;
      dataView(memory0).setInt8(arg7 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant10.val;
      dataView(memory0).setInt8(arg7 + 0, 1, true);
      var val9 = e;
      let enum9;
      switch (val9) {
        case "access": {
          enum9 = 0;
          break;
        }
        case "would-block": {
          enum9 = 1;
          break;
        }
        case "already": {
          enum9 = 2;
          break;
        }
        case "bad-descriptor": {
          enum9 = 3;
          break;
        }
        case "busy": {
          enum9 = 4;
          break;
        }
        case "deadlock": {
          enum9 = 5;
          break;
        }
        case "quota": {
          enum9 = 6;
          break;
        }
        case "exist": {
          enum9 = 7;
          break;
        }
        case "file-too-large": {
          enum9 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum9 = 9;
          break;
        }
        case "in-progress": {
          enum9 = 10;
          break;
        }
        case "interrupted": {
          enum9 = 11;
          break;
        }
        case "invalid": {
          enum9 = 12;
          break;
        }
        case "io": {
          enum9 = 13;
          break;
        }
        case "is-directory": {
          enum9 = 14;
          break;
        }
        case "loop": {
          enum9 = 15;
          break;
        }
        case "too-many-links": {
          enum9 = 16;
          break;
        }
        case "message-size": {
          enum9 = 17;
          break;
        }
        case "name-too-long": {
          enum9 = 18;
          break;
        }
        case "no-device": {
          enum9 = 19;
          break;
        }
        case "no-entry": {
          enum9 = 20;
          break;
        }
        case "no-lock": {
          enum9 = 21;
          break;
        }
        case "insufficient-memory": {
          enum9 = 22;
          break;
        }
        case "insufficient-space": {
          enum9 = 23;
          break;
        }
        case "not-directory": {
          enum9 = 24;
          break;
        }
        case "not-empty": {
          enum9 = 25;
          break;
        }
        case "not-recoverable": {
          enum9 = 26;
          break;
        }
        case "unsupported": {
          enum9 = 27;
          break;
        }
        case "no-tty": {
          enum9 = 28;
          break;
        }
        case "no-such-device": {
          enum9 = 29;
          break;
        }
        case "overflow": {
          enum9 = 30;
          break;
        }
        case "not-permitted": {
          enum9 = 31;
          break;
        }
        case "pipe": {
          enum9 = 32;
          break;
        }
        case "read-only": {
          enum9 = 33;
          break;
        }
        case "invalid-seek": {
          enum9 = 34;
          break;
        }
        case "text-file-busy": {
          enum9 = 35;
          break;
        }
        case "cross-device": {
          enum9 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val9}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg7 + 1, enum9, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant10, valueType: typeof variant10 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.link-at"][Instruction::Return]', {
    funcName: "[method]descriptor.link-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline19.fnName = "wasi:filesystem/types@0.2.0#linkAt";
var _trampoline20 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8)
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32)
  };
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.open-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "openAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.openAt(flags3, result4, flags5, flags6)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case "ok": {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor2)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = e[symbolRscHandle];
      if (!handle7) {
        const rep3 = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep3, e);
        handle7 = rscTableCreateOwn(handleTable3, rep3);
      }
      dataView(memory0).setInt32(arg6 + 4, handle7, true);
      break;
    }
    case "err": {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case "access": {
          enum8 = 0;
          break;
        }
        case "would-block": {
          enum8 = 1;
          break;
        }
        case "already": {
          enum8 = 2;
          break;
        }
        case "bad-descriptor": {
          enum8 = 3;
          break;
        }
        case "busy": {
          enum8 = 4;
          break;
        }
        case "deadlock": {
          enum8 = 5;
          break;
        }
        case "quota": {
          enum8 = 6;
          break;
        }
        case "exist": {
          enum8 = 7;
          break;
        }
        case "file-too-large": {
          enum8 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum8 = 9;
          break;
        }
        case "in-progress": {
          enum8 = 10;
          break;
        }
        case "interrupted": {
          enum8 = 11;
          break;
        }
        case "invalid": {
          enum8 = 12;
          break;
        }
        case "io": {
          enum8 = 13;
          break;
        }
        case "is-directory": {
          enum8 = 14;
          break;
        }
        case "loop": {
          enum8 = 15;
          break;
        }
        case "too-many-links": {
          enum8 = 16;
          break;
        }
        case "message-size": {
          enum8 = 17;
          break;
        }
        case "name-too-long": {
          enum8 = 18;
          break;
        }
        case "no-device": {
          enum8 = 19;
          break;
        }
        case "no-entry": {
          enum8 = 20;
          break;
        }
        case "no-lock": {
          enum8 = 21;
          break;
        }
        case "insufficient-memory": {
          enum8 = 22;
          break;
        }
        case "insufficient-space": {
          enum8 = 23;
          break;
        }
        case "not-directory": {
          enum8 = 24;
          break;
        }
        case "not-empty": {
          enum8 = 25;
          break;
        }
        case "not-recoverable": {
          enum8 = 26;
          break;
        }
        case "unsupported": {
          enum8 = 27;
          break;
        }
        case "no-tty": {
          enum8 = 28;
          break;
        }
        case "no-such-device": {
          enum8 = 29;
          break;
        }
        case "overflow": {
          enum8 = 30;
          break;
        }
        case "not-permitted": {
          enum8 = 31;
          break;
        }
        case "pipe": {
          enum8 = 32;
          break;
        }
        case "read-only": {
          enum8 = 33;
          break;
        }
        case "invalid-seek": {
          enum8 = 34;
          break;
        }
        case "text-file-busy": {
          enum8 = 35;
          break;
        }
        case "cross-device": {
          enum8 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum8, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant9, valueType: typeof variant9 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.open-at"][Instruction::Return]', {
    funcName: "[method]descriptor.open-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline20.fnName = "wasi:filesystem/types@0.2.0#openAt";
var _trampoline21 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.read"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "read",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.read(BigInt.asUintN(64, BigInt(arg1)), BigInt.asUintN(64, BigInt(arg2)))
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      var val4 = tuple3_0;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc0(0, 0, 1, len4 * 1);
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        let offset = 0;
        const dv4 = new DataView(memory0.buffer);
        for (const v of val4) {
          dv4.setUint8(ptr4 + offset, v, true);
          offset += 1;
        }
      } else {
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory0.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      dataView(memory0).setUint32(arg3 + 8, len4, true);
      dataView(memory0).setUint32(arg3 + 4, ptr4, true);
      dataView(memory0).setInt8(arg3 + 12, tuple3_1 ? 1 : 0, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.read"][Instruction::Return]', {
    funcName: "[method]descriptor.read",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline21.fnName = "wasi:filesystem/types@0.2.0#read";
var handleTable4 = [T_FLAG2, 0];
var captureTable4 = /* @__PURE__ */ new Map();
var captureCnt4 = 0;
handleTables[4] = handleTable4;
var _trampoline22 = function(arg0, arg1) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.read-directory"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "readDirectory",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.readDirectory()
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof DirectoryEntryStream2)) {
        throw new TypeError('Resource error: Not a valid "DirectoryEntryStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep3 = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep3, e);
        handle3 = rscTableCreateOwn(handleTable4, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "access": {
          enum4 = 0;
          break;
        }
        case "would-block": {
          enum4 = 1;
          break;
        }
        case "already": {
          enum4 = 2;
          break;
        }
        case "bad-descriptor": {
          enum4 = 3;
          break;
        }
        case "busy": {
          enum4 = 4;
          break;
        }
        case "deadlock": {
          enum4 = 5;
          break;
        }
        case "quota": {
          enum4 = 6;
          break;
        }
        case "exist": {
          enum4 = 7;
          break;
        }
        case "file-too-large": {
          enum4 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum4 = 9;
          break;
        }
        case "in-progress": {
          enum4 = 10;
          break;
        }
        case "interrupted": {
          enum4 = 11;
          break;
        }
        case "invalid": {
          enum4 = 12;
          break;
        }
        case "io": {
          enum4 = 13;
          break;
        }
        case "is-directory": {
          enum4 = 14;
          break;
        }
        case "loop": {
          enum4 = 15;
          break;
        }
        case "too-many-links": {
          enum4 = 16;
          break;
        }
        case "message-size": {
          enum4 = 17;
          break;
        }
        case "name-too-long": {
          enum4 = 18;
          break;
        }
        case "no-device": {
          enum4 = 19;
          break;
        }
        case "no-entry": {
          enum4 = 20;
          break;
        }
        case "no-lock": {
          enum4 = 21;
          break;
        }
        case "insufficient-memory": {
          enum4 = 22;
          break;
        }
        case "insufficient-space": {
          enum4 = 23;
          break;
        }
        case "not-directory": {
          enum4 = 24;
          break;
        }
        case "not-empty": {
          enum4 = 25;
          break;
        }
        case "not-recoverable": {
          enum4 = 26;
          break;
        }
        case "unsupported": {
          enum4 = 27;
          break;
        }
        case "no-tty": {
          enum4 = 28;
          break;
        }
        case "no-such-device": {
          enum4 = 29;
          break;
        }
        case "overflow": {
          enum4 = 30;
          break;
        }
        case "not-permitted": {
          enum4 = 31;
          break;
        }
        case "pipe": {
          enum4 = 32;
          break;
        }
        case "read-only": {
          enum4 = 33;
          break;
        }
        case "invalid-seek": {
          enum4 = 34;
          break;
        }
        case "text-file-busy": {
          enum4 = 35;
          break;
        }
        case "cross-device": {
          enum4 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.read-directory"][Instruction::Return]', {
    funcName: "[method]descriptor.read-directory",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline22.fnName = "wasi:filesystem/types@0.2.0#readDirectory";
var _trampoline23 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.readlink-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "readlinkAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.readlinkAt(result3)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
      var ptr4 = encodeRes.ptr;
      var len4 = encodeRes.len;
      dataView(memory0).setUint32(arg3 + 8, len4, true);
      dataView(memory0).setUint32(arg3 + 4, ptr4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.readlink-at"][Instruction::Return]', {
    funcName: "[method]descriptor.readlink-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline23.fnName = "wasi:filesystem/types@0.2.0#readlinkAt";
var _trampoline24 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.remove-directory-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "removeDirectoryAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.removeDirectoryAt(result3)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "access": {
          enum4 = 0;
          break;
        }
        case "would-block": {
          enum4 = 1;
          break;
        }
        case "already": {
          enum4 = 2;
          break;
        }
        case "bad-descriptor": {
          enum4 = 3;
          break;
        }
        case "busy": {
          enum4 = 4;
          break;
        }
        case "deadlock": {
          enum4 = 5;
          break;
        }
        case "quota": {
          enum4 = 6;
          break;
        }
        case "exist": {
          enum4 = 7;
          break;
        }
        case "file-too-large": {
          enum4 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum4 = 9;
          break;
        }
        case "in-progress": {
          enum4 = 10;
          break;
        }
        case "interrupted": {
          enum4 = 11;
          break;
        }
        case "invalid": {
          enum4 = 12;
          break;
        }
        case "io": {
          enum4 = 13;
          break;
        }
        case "is-directory": {
          enum4 = 14;
          break;
        }
        case "loop": {
          enum4 = 15;
          break;
        }
        case "too-many-links": {
          enum4 = 16;
          break;
        }
        case "message-size": {
          enum4 = 17;
          break;
        }
        case "name-too-long": {
          enum4 = 18;
          break;
        }
        case "no-device": {
          enum4 = 19;
          break;
        }
        case "no-entry": {
          enum4 = 20;
          break;
        }
        case "no-lock": {
          enum4 = 21;
          break;
        }
        case "insufficient-memory": {
          enum4 = 22;
          break;
        }
        case "insufficient-space": {
          enum4 = 23;
          break;
        }
        case "not-directory": {
          enum4 = 24;
          break;
        }
        case "not-empty": {
          enum4 = 25;
          break;
        }
        case "not-recoverable": {
          enum4 = 26;
          break;
        }
        case "unsupported": {
          enum4 = 27;
          break;
        }
        case "no-tty": {
          enum4 = 28;
          break;
        }
        case "no-such-device": {
          enum4 = 29;
          break;
        }
        case "overflow": {
          enum4 = 30;
          break;
        }
        case "not-permitted": {
          enum4 = 31;
          break;
        }
        case "pipe": {
          enum4 = 32;
          break;
        }
        case "read-only": {
          enum4 = 33;
          break;
        }
        case "invalid-seek": {
          enum4 = 34;
          break;
        }
        case "text-file-busy": {
          enum4 = 35;
          break;
        }
        case "cross-device": {
          enum4 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.remove-directory-at"][Instruction::Return]', {
    funcName: "[method]descriptor.remove-directory-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline24.fnName = "wasi:filesystem/types@0.2.0#removeDirectoryAt";
var _trampoline25 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var handle5 = arg3;
  var rep6 = handleTable3[(handle5 << 1) + 1] & ~T_FLAG2;
  var rsc4 = captureTable3.get(rep6);
  if (!rsc4) {
    rsc4 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5 });
    Object.defineProperty(rsc4, symbolRscRep, { writable: true, value: rep6 });
  }
  curResourceBorrows.push(rsc4);
  var ptr7 = arg4;
  var len7 = arg5;
  var result7 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr7, len7));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.rename-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "renameAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.renameAt(result3, rsc4, result7)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case "ok": {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case "access": {
          enum8 = 0;
          break;
        }
        case "would-block": {
          enum8 = 1;
          break;
        }
        case "already": {
          enum8 = 2;
          break;
        }
        case "bad-descriptor": {
          enum8 = 3;
          break;
        }
        case "busy": {
          enum8 = 4;
          break;
        }
        case "deadlock": {
          enum8 = 5;
          break;
        }
        case "quota": {
          enum8 = 6;
          break;
        }
        case "exist": {
          enum8 = 7;
          break;
        }
        case "file-too-large": {
          enum8 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum8 = 9;
          break;
        }
        case "in-progress": {
          enum8 = 10;
          break;
        }
        case "interrupted": {
          enum8 = 11;
          break;
        }
        case "invalid": {
          enum8 = 12;
          break;
        }
        case "io": {
          enum8 = 13;
          break;
        }
        case "is-directory": {
          enum8 = 14;
          break;
        }
        case "loop": {
          enum8 = 15;
          break;
        }
        case "too-many-links": {
          enum8 = 16;
          break;
        }
        case "message-size": {
          enum8 = 17;
          break;
        }
        case "name-too-long": {
          enum8 = 18;
          break;
        }
        case "no-device": {
          enum8 = 19;
          break;
        }
        case "no-entry": {
          enum8 = 20;
          break;
        }
        case "no-lock": {
          enum8 = 21;
          break;
        }
        case "insufficient-memory": {
          enum8 = 22;
          break;
        }
        case "insufficient-space": {
          enum8 = 23;
          break;
        }
        case "not-directory": {
          enum8 = 24;
          break;
        }
        case "not-empty": {
          enum8 = 25;
          break;
        }
        case "not-recoverable": {
          enum8 = 26;
          break;
        }
        case "unsupported": {
          enum8 = 27;
          break;
        }
        case "no-tty": {
          enum8 = 28;
          break;
        }
        case "no-such-device": {
          enum8 = 29;
          break;
        }
        case "overflow": {
          enum8 = 30;
          break;
        }
        case "not-permitted": {
          enum8 = 31;
          break;
        }
        case "pipe": {
          enum8 = 32;
          break;
        }
        case "read-only": {
          enum8 = 33;
          break;
        }
        case "invalid-seek": {
          enum8 = 34;
          break;
        }
        case "text-file-busy": {
          enum8 = 35;
          break;
        }
        case "cross-device": {
          enum8 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 1, enum8, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant9, valueType: typeof variant9 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.rename-at"][Instruction::Return]', {
    funcName: "[method]descriptor.rename-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline25.fnName = "wasi:filesystem/types@0.2.0#renameAt";
var _trampoline26 = function(arg0, arg1) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.stat"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "stat",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.stat()
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case "ok": {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var { type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case "unknown": {
          enum4 = 0;
          break;
        }
        case "block-device": {
          enum4 = 1;
          break;
        }
        case "character-device": {
          enum4 = 2;
          break;
        }
        case "directory": {
          enum4 = 3;
          break;
        }
        case "fifo": {
          enum4 = 4;
          break;
        }
        case "symbolic-link": {
          enum4 = 5;
          break;
        }
        case "regular-file": {
          enum4 = 6;
          break;
        }
        case "socket": {
          enum4 = 7;
          break;
        }
        default: {
          if (v3_0 instanceof Error) {
            console.error(v3_0);
          }
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6 === void 0) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e2 = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var { seconds: v5_0, nanoseconds: v5_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8 === void 0) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e2 = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var { seconds: v7_0, nanoseconds: v7_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10 === void 0) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e2 = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var { seconds: v9_0, nanoseconds: v9_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case "err": {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case "access": {
          enum11 = 0;
          break;
        }
        case "would-block": {
          enum11 = 1;
          break;
        }
        case "already": {
          enum11 = 2;
          break;
        }
        case "bad-descriptor": {
          enum11 = 3;
          break;
        }
        case "busy": {
          enum11 = 4;
          break;
        }
        case "deadlock": {
          enum11 = 5;
          break;
        }
        case "quota": {
          enum11 = 6;
          break;
        }
        case "exist": {
          enum11 = 7;
          break;
        }
        case "file-too-large": {
          enum11 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum11 = 9;
          break;
        }
        case "in-progress": {
          enum11 = 10;
          break;
        }
        case "interrupted": {
          enum11 = 11;
          break;
        }
        case "invalid": {
          enum11 = 12;
          break;
        }
        case "io": {
          enum11 = 13;
          break;
        }
        case "is-directory": {
          enum11 = 14;
          break;
        }
        case "loop": {
          enum11 = 15;
          break;
        }
        case "too-many-links": {
          enum11 = 16;
          break;
        }
        case "message-size": {
          enum11 = 17;
          break;
        }
        case "name-too-long": {
          enum11 = 18;
          break;
        }
        case "no-device": {
          enum11 = 19;
          break;
        }
        case "no-entry": {
          enum11 = 20;
          break;
        }
        case "no-lock": {
          enum11 = 21;
          break;
        }
        case "insufficient-memory": {
          enum11 = 22;
          break;
        }
        case "insufficient-space": {
          enum11 = 23;
          break;
        }
        case "not-directory": {
          enum11 = 24;
          break;
        }
        case "not-empty": {
          enum11 = 25;
          break;
        }
        case "not-recoverable": {
          enum11 = 26;
          break;
        }
        case "unsupported": {
          enum11 = 27;
          break;
        }
        case "no-tty": {
          enum11 = 28;
          break;
        }
        case "no-such-device": {
          enum11 = 29;
          break;
        }
        case "overflow": {
          enum11 = 30;
          break;
        }
        case "not-permitted": {
          enum11 = 31;
          break;
        }
        case "pipe": {
          enum11 = 32;
          break;
        }
        case "read-only": {
          enum11 = 33;
          break;
        }
        case "invalid-seek": {
          enum11 = 34;
          break;
        }
        case "text-file-busy": {
          enum11 = 35;
          break;
        }
        case "cross-device": {
          enum11 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant12, valueType: typeof variant12 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.stat"][Instruction::Return]', {
    funcName: "[method]descriptor.stat",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline26.fnName = "wasi:filesystem/types@0.2.0#stat";
var _trampoline27 = function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.stat-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "statAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.statAt(flags3, result4)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant14 = ret;
  switch (variant14.tag) {
    case "ok": {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var { type: v5_0, linkCount: v5_1, size: v5_2, dataAccessTimestamp: v5_3, dataModificationTimestamp: v5_4, statusChangeTimestamp: v5_5 } = e;
      var val6 = v5_0;
      let enum6;
      switch (val6) {
        case "unknown": {
          enum6 = 0;
          break;
        }
        case "block-device": {
          enum6 = 1;
          break;
        }
        case "character-device": {
          enum6 = 2;
          break;
        }
        case "directory": {
          enum6 = 3;
          break;
        }
        case "fifo": {
          enum6 = 4;
          break;
        }
        case "symbolic-link": {
          enum6 = 5;
          break;
        }
        case "regular-file": {
          enum6 = 6;
          break;
        }
        case "socket": {
          enum6 = 7;
          break;
        }
        default: {
          if (v5_0 instanceof Error) {
            console.error(v5_0);
          }
          throw new TypeError(`"${val6}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum6, true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      dataView(memory0).setBigInt64(arg4 + 24, toUint64(v5_2), true);
      var variant8 = v5_3;
      if (variant8 === null || variant8 === void 0) {
        dataView(memory0).setInt8(arg4 + 32, 0, true);
      } else {
        const e2 = variant8;
        dataView(memory0).setInt8(arg4 + 32, 1, true);
        var { seconds: v7_0, nanoseconds: v7_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 40, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg4 + 48, toUint32(v7_1), true);
      }
      var variant10 = v5_4;
      if (variant10 === null || variant10 === void 0) {
        dataView(memory0).setInt8(arg4 + 56, 0, true);
      } else {
        const e2 = variant10;
        dataView(memory0).setInt8(arg4 + 56, 1, true);
        var { seconds: v9_0, nanoseconds: v9_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 64, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg4 + 72, toUint32(v9_1), true);
      }
      var variant12 = v5_5;
      if (variant12 === null || variant12 === void 0) {
        dataView(memory0).setInt8(arg4 + 80, 0, true);
      } else {
        const e2 = variant12;
        dataView(memory0).setInt8(arg4 + 80, 1, true);
        var { seconds: v11_0, nanoseconds: v11_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 88, toUint64(v11_0), true);
        dataView(memory0).setInt32(arg4 + 96, toUint32(v11_1), true);
      }
      break;
    }
    case "err": {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val13 = e;
      let enum13;
      switch (val13) {
        case "access": {
          enum13 = 0;
          break;
        }
        case "would-block": {
          enum13 = 1;
          break;
        }
        case "already": {
          enum13 = 2;
          break;
        }
        case "bad-descriptor": {
          enum13 = 3;
          break;
        }
        case "busy": {
          enum13 = 4;
          break;
        }
        case "deadlock": {
          enum13 = 5;
          break;
        }
        case "quota": {
          enum13 = 6;
          break;
        }
        case "exist": {
          enum13 = 7;
          break;
        }
        case "file-too-large": {
          enum13 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum13 = 9;
          break;
        }
        case "in-progress": {
          enum13 = 10;
          break;
        }
        case "interrupted": {
          enum13 = 11;
          break;
        }
        case "invalid": {
          enum13 = 12;
          break;
        }
        case "io": {
          enum13 = 13;
          break;
        }
        case "is-directory": {
          enum13 = 14;
          break;
        }
        case "loop": {
          enum13 = 15;
          break;
        }
        case "too-many-links": {
          enum13 = 16;
          break;
        }
        case "message-size": {
          enum13 = 17;
          break;
        }
        case "name-too-long": {
          enum13 = 18;
          break;
        }
        case "no-device": {
          enum13 = 19;
          break;
        }
        case "no-entry": {
          enum13 = 20;
          break;
        }
        case "no-lock": {
          enum13 = 21;
          break;
        }
        case "insufficient-memory": {
          enum13 = 22;
          break;
        }
        case "insufficient-space": {
          enum13 = 23;
          break;
        }
        case "not-directory": {
          enum13 = 24;
          break;
        }
        case "not-empty": {
          enum13 = 25;
          break;
        }
        case "not-recoverable": {
          enum13 = 26;
          break;
        }
        case "unsupported": {
          enum13 = 27;
          break;
        }
        case "no-tty": {
          enum13 = 28;
          break;
        }
        case "no-such-device": {
          enum13 = 29;
          break;
        }
        case "overflow": {
          enum13 = 30;
          break;
        }
        case "not-permitted": {
          enum13 = 31;
          break;
        }
        case "pipe": {
          enum13 = 32;
          break;
        }
        case "read-only": {
          enum13 = 33;
          break;
        }
        case "invalid-seek": {
          enum13 = 34;
          break;
        }
        case "text-file-busy": {
          enum13 = 35;
          break;
        }
        case "cross-device": {
          enum13 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val13}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum13, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant14, valueType: typeof variant14 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.stat-at"][Instruction::Return]', {
    funcName: "[method]descriptor.stat-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline27.fnName = "wasi:filesystem/types@0.2.0#statAt";
var _trampoline28 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var ptr4 = arg3;
  var len4 = arg4;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.symlink-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "symlinkAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.symlinkAt(result3, result4)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg5 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg5 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg5 + 1, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.symlink-at"][Instruction::Return]', {
    funcName: "[method]descriptor.symlink-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline28.fnName = "wasi:filesystem/types@0.2.0#symlinkAt";
var _trampoline29 = function(arg0, arg1) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.sync-data"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "syncData",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.syncData()
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case "ok": {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case "access": {
          enum3 = 0;
          break;
        }
        case "would-block": {
          enum3 = 1;
          break;
        }
        case "already": {
          enum3 = 2;
          break;
        }
        case "bad-descriptor": {
          enum3 = 3;
          break;
        }
        case "busy": {
          enum3 = 4;
          break;
        }
        case "deadlock": {
          enum3 = 5;
          break;
        }
        case "quota": {
          enum3 = 6;
          break;
        }
        case "exist": {
          enum3 = 7;
          break;
        }
        case "file-too-large": {
          enum3 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum3 = 9;
          break;
        }
        case "in-progress": {
          enum3 = 10;
          break;
        }
        case "interrupted": {
          enum3 = 11;
          break;
        }
        case "invalid": {
          enum3 = 12;
          break;
        }
        case "io": {
          enum3 = 13;
          break;
        }
        case "is-directory": {
          enum3 = 14;
          break;
        }
        case "loop": {
          enum3 = 15;
          break;
        }
        case "too-many-links": {
          enum3 = 16;
          break;
        }
        case "message-size": {
          enum3 = 17;
          break;
        }
        case "name-too-long": {
          enum3 = 18;
          break;
        }
        case "no-device": {
          enum3 = 19;
          break;
        }
        case "no-entry": {
          enum3 = 20;
          break;
        }
        case "no-lock": {
          enum3 = 21;
          break;
        }
        case "insufficient-memory": {
          enum3 = 22;
          break;
        }
        case "insufficient-space": {
          enum3 = 23;
          break;
        }
        case "not-directory": {
          enum3 = 24;
          break;
        }
        case "not-empty": {
          enum3 = 25;
          break;
        }
        case "not-recoverable": {
          enum3 = 26;
          break;
        }
        case "unsupported": {
          enum3 = 27;
          break;
        }
        case "no-tty": {
          enum3 = 28;
          break;
        }
        case "no-such-device": {
          enum3 = 29;
          break;
        }
        case "overflow": {
          enum3 = 30;
          break;
        }
        case "not-permitted": {
          enum3 = 31;
          break;
        }
        case "pipe": {
          enum3 = 32;
          break;
        }
        case "read-only": {
          enum3 = 33;
          break;
        }
        case "invalid-seek": {
          enum3 = 34;
          break;
        }
        case "text-file-busy": {
          enum3 = 35;
          break;
        }
        case "cross-device": {
          enum3 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.sync-data"][Instruction::Return]', {
    funcName: "[method]descriptor.sync-data",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline29.fnName = "wasi:filesystem/types@0.2.0#syncData";
var _trampoline30 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.unlink-file-at"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "unlinkFileAt",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.unlinkFileAt(result3)
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "access": {
          enum4 = 0;
          break;
        }
        case "would-block": {
          enum4 = 1;
          break;
        }
        case "already": {
          enum4 = 2;
          break;
        }
        case "bad-descriptor": {
          enum4 = 3;
          break;
        }
        case "busy": {
          enum4 = 4;
          break;
        }
        case "deadlock": {
          enum4 = 5;
          break;
        }
        case "quota": {
          enum4 = 6;
          break;
        }
        case "exist": {
          enum4 = 7;
          break;
        }
        case "file-too-large": {
          enum4 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum4 = 9;
          break;
        }
        case "in-progress": {
          enum4 = 10;
          break;
        }
        case "interrupted": {
          enum4 = 11;
          break;
        }
        case "invalid": {
          enum4 = 12;
          break;
        }
        case "io": {
          enum4 = 13;
          break;
        }
        case "is-directory": {
          enum4 = 14;
          break;
        }
        case "loop": {
          enum4 = 15;
          break;
        }
        case "too-many-links": {
          enum4 = 16;
          break;
        }
        case "message-size": {
          enum4 = 17;
          break;
        }
        case "name-too-long": {
          enum4 = 18;
          break;
        }
        case "no-device": {
          enum4 = 19;
          break;
        }
        case "no-entry": {
          enum4 = 20;
          break;
        }
        case "no-lock": {
          enum4 = 21;
          break;
        }
        case "insufficient-memory": {
          enum4 = 22;
          break;
        }
        case "insufficient-space": {
          enum4 = 23;
          break;
        }
        case "not-directory": {
          enum4 = 24;
          break;
        }
        case "not-empty": {
          enum4 = 25;
          break;
        }
        case "not-recoverable": {
          enum4 = 26;
          break;
        }
        case "unsupported": {
          enum4 = 27;
          break;
        }
        case "no-tty": {
          enum4 = 28;
          break;
        }
        case "no-such-device": {
          enum4 = 29;
          break;
        }
        case "overflow": {
          enum4 = 30;
          break;
        }
        case "not-permitted": {
          enum4 = 31;
          break;
        }
        case "pipe": {
          enum4 = 32;
          break;
        }
        case "read-only": {
          enum4 = 33;
          break;
        }
        case "invalid-seek": {
          enum4 = 34;
          break;
        }
        case "text-file-busy": {
          enum4 = 35;
          break;
        }
        case "cross-device": {
          enum4 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.unlink-file-at"][Instruction::Return]', {
    funcName: "[method]descriptor.unlink-file-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline30.fnName = "wasi:filesystem/types@0.2.0#unlinkFileAt";
var _trampoline31 = function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep22 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable3.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.write"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "write",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.write(result3, BigInt.asUintN(64, BigInt(arg3)))
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(e), true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "access": {
          enum4 = 0;
          break;
        }
        case "would-block": {
          enum4 = 1;
          break;
        }
        case "already": {
          enum4 = 2;
          break;
        }
        case "bad-descriptor": {
          enum4 = 3;
          break;
        }
        case "busy": {
          enum4 = 4;
          break;
        }
        case "deadlock": {
          enum4 = 5;
          break;
        }
        case "quota": {
          enum4 = 6;
          break;
        }
        case "exist": {
          enum4 = 7;
          break;
        }
        case "file-too-large": {
          enum4 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum4 = 9;
          break;
        }
        case "in-progress": {
          enum4 = 10;
          break;
        }
        case "interrupted": {
          enum4 = 11;
          break;
        }
        case "invalid": {
          enum4 = 12;
          break;
        }
        case "io": {
          enum4 = 13;
          break;
        }
        case "is-directory": {
          enum4 = 14;
          break;
        }
        case "loop": {
          enum4 = 15;
          break;
        }
        case "too-many-links": {
          enum4 = 16;
          break;
        }
        case "message-size": {
          enum4 = 17;
          break;
        }
        case "name-too-long": {
          enum4 = 18;
          break;
        }
        case "no-device": {
          enum4 = 19;
          break;
        }
        case "no-entry": {
          enum4 = 20;
          break;
        }
        case "no-lock": {
          enum4 = 21;
          break;
        }
        case "insufficient-memory": {
          enum4 = 22;
          break;
        }
        case "insufficient-space": {
          enum4 = 23;
          break;
        }
        case "not-directory": {
          enum4 = 24;
          break;
        }
        case "not-empty": {
          enum4 = 25;
          break;
        }
        case "not-recoverable": {
          enum4 = 26;
          break;
        }
        case "unsupported": {
          enum4 = 27;
          break;
        }
        case "no-tty": {
          enum4 = 28;
          break;
        }
        case "no-such-device": {
          enum4 = 29;
          break;
        }
        case "overflow": {
          enum4 = 30;
          break;
        }
        case "not-permitted": {
          enum4 = 31;
          break;
        }
        case "pipe": {
          enum4 = 32;
          break;
        }
        case "read-only": {
          enum4 = 33;
          break;
        }
        case "invalid-seek": {
          enum4 = 34;
          break;
        }
        case "text-file-busy": {
          enum4 = 35;
          break;
        }
        case "cross-device": {
          enum4 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum4, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]descriptor.write"][Instruction::Return]', {
    funcName: "[method]descriptor.write",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline31.fnName = "wasi:filesystem/types@0.2.0#write";
var _trampoline32 = function(arg0, arg1) {
  var handle1 = arg0;
  var rep22 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG2;
  var rsc0 = captureTable4.get(rep22);
  if (!rsc0) {
    rsc0 = Object.create(DirectoryEntryStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep22 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]directory-entry-stream.read-directory-entry"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "readDirectoryEntry",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret;
  try {
    ret = {
      tag: "ok",
      val: _withGlobalCurrentTaskMeta({
        componentIdx: task.componentIdx(),
        taskID: task.id(),
        fn: () => rsc0.readDirectoryEntry()
      })
    };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case "ok": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant6 = e;
      if (variant6 === null || variant6 === void 0) {
        dataView(memory0).setInt8(arg1 + 4, 0, true);
      } else {
        const e2 = variant6;
        dataView(memory0).setInt8(arg1 + 4, 1, true);
        var { type: v3_0, name: v3_1 } = e2;
        var val4 = v3_0;
        let enum4;
        switch (val4) {
          case "unknown": {
            enum4 = 0;
            break;
          }
          case "block-device": {
            enum4 = 1;
            break;
          }
          case "character-device": {
            enum4 = 2;
            break;
          }
          case "directory": {
            enum4 = 3;
            break;
          }
          case "fifo": {
            enum4 = 4;
            break;
          }
          case "symbolic-link": {
            enum4 = 5;
            break;
          }
          case "regular-file": {
            enum4 = 6;
            break;
          }
          case "socket": {
            enum4 = 7;
            break;
          }
          default: {
            if (v3_0 instanceof Error) {
              console.error(v3_0);
            }
            throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
          }
        }
        dataView(memory0).setInt8(arg1 + 8, enum4, true);
        var encodeRes = _utf8AllocateAndEncode(v3_1, realloc0, memory0);
        var ptr5 = encodeRes.ptr;
        var len5 = encodeRes.len;
        dataView(memory0).setUint32(arg1 + 16, len5, true);
        dataView(memory0).setUint32(arg1 + 12, ptr5, true);
      }
      break;
    }
    case "err": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case "access": {
          enum7 = 0;
          break;
        }
        case "would-block": {
          enum7 = 1;
          break;
        }
        case "already": {
          enum7 = 2;
          break;
        }
        case "bad-descriptor": {
          enum7 = 3;
          break;
        }
        case "busy": {
          enum7 = 4;
          break;
        }
        case "deadlock": {
          enum7 = 5;
          break;
        }
        case "quota": {
          enum7 = 6;
          break;
        }
        case "exist": {
          enum7 = 7;
          break;
        }
        case "file-too-large": {
          enum7 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum7 = 9;
          break;
        }
        case "in-progress": {
          enum7 = 10;
          break;
        }
        case "interrupted": {
          enum7 = 11;
          break;
        }
        case "invalid": {
          enum7 = 12;
          break;
        }
        case "io": {
          enum7 = 13;
          break;
        }
        case "is-directory": {
          enum7 = 14;
          break;
        }
        case "loop": {
          enum7 = 15;
          break;
        }
        case "too-many-links": {
          enum7 = 16;
          break;
        }
        case "message-size": {
          enum7 = 17;
          break;
        }
        case "name-too-long": {
          enum7 = 18;
          break;
        }
        case "no-device": {
          enum7 = 19;
          break;
        }
        case "no-entry": {
          enum7 = 20;
          break;
        }
        case "no-lock": {
          enum7 = 21;
          break;
        }
        case "insufficient-memory": {
          enum7 = 22;
          break;
        }
        case "insufficient-space": {
          enum7 = 23;
          break;
        }
        case "not-directory": {
          enum7 = 24;
          break;
        }
        case "not-empty": {
          enum7 = 25;
          break;
        }
        case "not-recoverable": {
          enum7 = 26;
          break;
        }
        case "unsupported": {
          enum7 = 27;
          break;
        }
        case "no-tty": {
          enum7 = 28;
          break;
        }
        case "no-such-device": {
          enum7 = 29;
          break;
        }
        case "overflow": {
          enum7 = 30;
          break;
        }
        case "not-permitted": {
          enum7 = 31;
          break;
        }
        case "pipe": {
          enum7 = 32;
          break;
        }
        case "read-only": {
          enum7 = 33;
          break;
        }
        case "invalid-seek": {
          enum7 = 34;
          break;
        }
        case "text-file-busy": {
          enum7 = 35;
          break;
        }
        case "cross-device": {
          enum7 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum7, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant8, valueType: typeof variant8 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.0", function="[method]directory-entry-stream.read-directory-entry"][Instruction::Return]', {
    funcName: "[method]directory-entry-stream.read-directory-entry",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline32.fnName = "wasi:filesystem/types@0.2.0#readDirectoryEntry";
var _trampoline33 = function(arg0) {
  _debugLog('[iface="wasi:filesystem/preopens@0.2.0", function="get-directories"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      // 0,
      isAsync: false,
      entryFnName: "getDirectories",
      getCallbackFn: () => null,
      callbackFnName: "null",
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  };
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    createTask();
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getDirectories()
  });
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;
    var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor2)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep3 = tuple0_0[symbolRscRep] || ++captureCnt3;
      captureTable3.set(rep3, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable3, rep3);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc0, memory0);
    var ptr2 = encodeRes.ptr;
    var len2 = encodeRes.len;
    dataView(memory0).setUint32(base + 8, len2, true);
    dataView(memory0).setUint32(base + 4, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:filesystem/preopens@0.2.0", function="get-directories"][Instruction::Return]', {
    funcName: "get-directories",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
};
_trampoline33.fnName = "wasi:filesystem/preopens@0.2.0#getDirectories";
var exports2;
var exports3;
var run020Run;
function run() {
  _debugLog('[iface="wasi:cli/run@0.2.0", function="run"][Instruction::CallWasm] enter', {
    funcName: "run",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  const hostProvided = false;
  const [task, _wasm_call_currentTaskID] = createNewCurrentTask({
    componentIdx: 0,
    isAsync: false,
    isManualAsync: false,
    entryFnName: "run020Run",
    getCallbackFn: () => null,
    callbackFnName: "null",
    errHandling: "throw-result-err",
    callingWasmExport: true
  });
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    taskID: task.id(),
    componentIdx: task.componentIdx(),
    fn: () => run020Run()
  });
  let variant0;
  switch (ret) {
    case 0: {
      variant0 = {
        tag: "ok",
        val: void 0
      };
      break;
    }
    case 1: {
      variant0 = {
        tag: "err",
        val: void 0
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  _debugLog('[iface="wasi:cli/run@0.2.0", function="run"][Instruction::Return]', {
    funcName: "run",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  const retCopy = variant0;
  task.resolve([retCopy.val]);
  task.exit();
  if (typeof retCopy === "object" && retCopy.tag === "err") {
    throw new ComponentError(retCopy.val);
  }
  return retCopy.val;
}
var trampoline0 = _trampoline0.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 0,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline0.manuallyAsync,
    paramLiftFns: [_liftFlatResult([["ok", null, 0, 0, 0], ["err", null, 0, 0, 0]])],
    resultLowerFns: [],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline0
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 0,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline0.manuallyAsync,
    paramLiftFns: [_liftFlatResult([["ok", null, 0, 0, 0], ["err", null, 0, 0, 0]])],
    resultLowerFns: [],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline0
  }
);
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose3]) rsc[symbolDispose3]();
      captureTable1.delete(handleEntry.rep);
    } else if (InputStream3[symbolCabiDispose]) {
      InputStream3[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose3]) rsc[symbolDispose3]();
      captureTable2.delete(handleEntry.rep);
    } else if (OutputStream3[symbolCabiDispose]) {
      OutputStream3[symbolCabiDispose](handleEntry.rep);
    }
  }
}
var trampoline3 = _trampoline3.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 3,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline3.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline3
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 3,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline3.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline3
  }
);
var trampoline4 = _trampoline4.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 4,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline4.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatU64],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline4
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 4,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline4.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatU64],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline4
  }
);
var trampoline5 = _trampoline5.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 5,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline5.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatU64],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline5
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 5,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline5.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatU64],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline5
  }
);
var trampoline6 = _trampoline6.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 6,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline6.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline6
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 6,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline6.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline6
  }
);
var trampoline7 = _trampoline7.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 7,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline7.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 1)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline7
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 7,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline7.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn.bind(null, 1)],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: null,
    getMemoryFn: () => null,
    getReallocFn: () => null,
    importFn: _trampoline7
  }
);
function trampoline8(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose3]) rsc[symbolDispose3]();
      captureTable3.delete(handleEntry.rep);
    } else if (Descriptor2[symbolCabiDispose]) {
      Descriptor2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline9(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose3]) rsc[symbolDispose3]();
      captureTable4.delete(handleEntry.rep);
    } else if (DirectoryEntryStream2[symbolCabiDispose]) {
      DirectoryEntryStream2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
var trampoline10 = _trampoline10.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 10,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline10.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 0), typeIdx: 0 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline10
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 10,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline10.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 0), typeIdx: 0 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline10
  }
);
var trampoline11 = _trampoline11.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 11,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline11.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatStringUTF8, typeIdx: 1 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline11
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 11,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline11.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatStringUTF8, typeIdx: 1 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline11
  }
);
var trampoline12 = _trampoline12.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 12,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline12.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOption([["some", _lowerFlatStringUTF8, 12, 4, 4], ["none", null, 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline12
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 12,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline12.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOption([["some", _lowerFlatStringUTF8, 12, 4, 4], ["none", null, 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline12
  }
);
var trampoline13 = _trampoline13.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 13,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline13.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 1), _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline13
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 13,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline13.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 1), _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline13
  }
);
var trampoline14 = _trampoline14.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 14,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline14.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
    resultLowerFns: [_lowerFlatResult([["ok", null, 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline14
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 14,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline14.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
    resultLowerFns: [_lowerFlatResult([["ok", null, 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline14
  }
);
var trampoline15 = _trampoline15.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 15,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline15.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 2), _liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
    resultLowerFns: [_lowerFlatResult([["ok", null, 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline15
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 15,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline15.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 2), _liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
    resultLowerFns: [_lowerFlatResult([["ok", null, 12, 4, 4], ["err", _lowerFlatVariant([["last-operation-failed", _lowerFlatOwn.bind(null, 0), 8, 4, 4], ["closed", null, 8, 4, 4]]), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline15
  }
);
var trampoline16 = _trampoline16.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 16,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline16.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline16
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 16,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline16.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline16
  }
);
var trampoline17 = _trampoline17.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 17,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline17.manuallyAsync,
    paramLiftFns: [_liftFlatU64],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline17
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 17,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline17.manuallyAsync,
    paramLiftFns: [_liftFlatU64],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline17
  }
);
var trampoline18 = _trampoline18.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 18,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline18.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline18
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 18,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline18.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline18
  }
);
var trampoline19 = _trampoline19.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 19,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline19.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8, _liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline19
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 19,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline19.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8, _liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline19
  }
);
var trampoline20 = _trampoline20.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 20,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline20.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8, _liftFlatFlags({ names: ["create", "directory", "exclusive", "truncate"], size32: 1, align32: 1, intSize: 1 }), _liftFlatFlags({ names: ["read", "write", "file-integrity-sync", "data-integrity-sync", "requested-write-sync", "mutate-directory"], size32: 1, align32: 1, intSize: 1 })],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOwn.bind(null, 3), 8, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 8, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline20
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 20,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline20.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8, _liftFlatFlags({ names: ["create", "directory", "exclusive", "truncate"], size32: 1, align32: 1, intSize: 1 }), _liftFlatFlags({ names: ["read", "write", "file-integrity-sync", "data-integrity-sync", "requested-write-sync", "mutate-directory"], size32: 1, align32: 1, intSize: 1 })],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOwn.bind(null, 3), 8, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 8, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline20
  }
);
var trampoline21 = _trampoline21.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 21,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline21.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatU64, _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatTuple.bind(null, 17), 16, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 16, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline21
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 21,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline21.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatU64, _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatTuple.bind(null, 17), 16, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 16, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline21
  }
);
var trampoline22 = _trampoline22.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 22,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline22.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOwn.bind(null, 4), 8, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 8, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline22
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 22,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline22.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOwn.bind(null, 4), 8, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 8, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline22
  }
);
var trampoline23 = _trampoline23.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 23,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline23.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatStringUTF8, 12, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline23
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 23,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline23.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatStringUTF8, 12, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 12, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline23
  }
);
var trampoline24 = _trampoline24.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 24,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline24.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline24
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 24,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline24.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline24
  }
);
var trampoline25 = _trampoline25.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 25,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline25.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8, _liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline25
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 25,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline25.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8, _liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline25
  }
);
var trampoline26 = _trampoline26.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 26,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline26.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 96, 8], ["linkCount", _lowerFlatU64, 96, 8], ["size", _lowerFlatU64, 96, 8], ["dataAccessTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["dataModificationTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["statusChangeTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8]]), 104, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 104, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline26
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 26,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline26.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 96, 8], ["linkCount", _lowerFlatU64, 96, 8], ["size", _lowerFlatU64, 96, 8], ["dataAccessTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["dataModificationTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["statusChangeTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8]]), 104, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 104, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline26
  }
);
var trampoline27 = _trampoline27.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 27,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline27.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 96, 8], ["linkCount", _lowerFlatU64, 96, 8], ["size", _lowerFlatU64, 96, 8], ["dataAccessTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["dataModificationTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["statusChangeTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8]]), 104, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 104, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline27
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 27,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline27.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatFlags({ names: ["symlink-follow"], size32: 1, align32: 1, intSize: 1 }), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 96, 8], ["linkCount", _lowerFlatU64, 96, 8], ["size", _lowerFlatU64, 96, 8], ["dataAccessTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["dataModificationTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8], ["statusChangeTimestamp", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["seconds", _lowerFlatU64, 16, 8], ["nanoseconds", _lowerFlatU32, 16, 8]]), 24, 8, 8], ["none", null, 24, 8, 8]]), 96, 8]]), 104, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 104, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline27
  }
);
var trampoline28 = _trampoline28.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 28,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline28.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8, _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline28
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 28,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline28.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8, _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline28
  }
);
var trampoline29 = _trampoline29.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 29,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline29.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline29
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 29,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline29.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline29
  }
);
var trampoline30 = _trampoline30.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 30,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline30.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline30
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 30,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline30.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatStringUTF8],
    resultLowerFns: [_lowerFlatResult([["ok", null, 2, 1, 1], ["err", _lowerFlatEnum.bind(null, 0), 2, 1, 1]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline30
  }
);
var trampoline31 = _trampoline31.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 31,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline31.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 }), _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatU64, 16, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 16, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline31
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 31,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline31.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 3), _liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 }), _liftFlatU64],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatU64, 16, 8, 8], ["err", _lowerFlatEnum.bind(null, 0), 16, 8, 8]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => null,
    importFn: _trampoline31
  }
);
var trampoline32 = _trampoline32.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 32,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline32.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 4)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 12, 4], ["name", _lowerFlatStringUTF8, 12, 4]]), 16, 4, 4], ["none", null, 16, 4, 4]]), 20, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 20, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline32
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 32,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline32.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 4)],
    resultLowerFns: [_lowerFlatResult([["ok", _lowerFlatOption([["some", _lowerFlatRecord.bind(null, [["type", _lowerFlatEnum.bind(null, 1), 12, 4], ["name", _lowerFlatStringUTF8, 12, 4]]), 16, 4, 4], ["none", null, 16, 4, 4]]), 20, 4, 4], ["err", _lowerFlatEnum.bind(null, 0), 20, 4, 4]])],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline32
  }
);
var trampoline33 = _trampoline33.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 33,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline33.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 34), typeIdx: 3 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline33
  }
)) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 33,
    componentIdx: 0,
    isAsync: false,
    isManualAsync: _trampoline33.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 34), typeIdx: 3 })],
    funcTypeIsAsync: false,
    getCallbackFn: () => null,
    getPostReturnFn: () => null,
    isCancellable: false,
    memoryIdx: 0,
    getMemoryFn: () => memory0,
    getReallocFn: () => realloc0,
    importFn: _trampoline33
  }
);
var $init = (() => {
  let gen = (function* _initGenerator() {
    const module0 = fetchCompile(new URL("./action.core.wasm", import.meta.url));
    const module1 = base64Compile("AGFzbQEAAAABWwxgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAJ+fwBgCH9/f39/f39/AGAHf39/f39/fwBgBH9+fn8AYAd/f39/f39/AGAFf39/f38AYAZ/f39/f38AYAV/f39+fwADGRgAAAABAgMABAMFBgcCAwMIAgkKAgMLAgAEBQFwARgYB3oZATAAAAExAAEBMgACATMAAwE0AAQBNQAFATYABgE3AAcBOAAIATkACQIxMAAKAjExAAsCMTIADAIxMwANAjE0AA4CMTUADwIxNgAQAjE3ABECMTgAEgIxOQATAjIwABQCMjEAFQIyMgAWAjIzABcIJGltcG9ydHMBAArlAhgJACAAQQARAAALCQAgAEEBEQAACwkAIABBAhEAAAsNACAAIAEgAkEDEQEACwsAIAAgAUEEEQIACw8AIAAgASACIANBBREDAAsJACAAQQYRAAALCwAgACABQQcRBAALDwAgACABIAIgA0EIEQMACxcAIAAgASACIAMgBCAFIAYgB0EJEQUACxUAIAAgASACIAMgBCAFIAZBChEGAAsPACAAIAEgAiADQQsRBwALCwAgACABQQwRAgALDwAgACABIAIgA0ENEQMACw8AIAAgASACIANBDhEDAAsVACAAIAEgAiADIAQgBSAGQQ8RCAALCwAgACABQRARAgALEQAgACABIAIgAyAEQRERCQALEwAgACABIAIgAyAEIAVBEhEKAAsLACAAIAFBExECAAsPACAAIAEgAiADQRQRAwALEQAgACABIAIgAyAEQRURCwALCwAgACABQRYRAgALCQAgAEEXEQAACwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjQ2LjI");
    const module2 = base64Compile("AGFzbQEAAAABWwxgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAJ+fwBgCH9/f39/f39/AGAHf39/f39/fwBgBH9+fn8AYAd/f39/f39/AGAFf39/f38AYAZ/f39/f38AYAV/f39+fwAClgEZAAEwAAAAATEAAAABMgAAAAEzAAEAATQAAgABNQADAAE2AAAAATcABAABOAADAAE5AAUAAjEwAAYAAjExAAcAAjEyAAIAAjEzAAMAAjE0AAMAAjE1AAgAAjE2AAIAAjE3AAkAAjE4AAoAAjE5AAIAAjIwAAMAAjIxAAsAAjIyAAIAAjIzAAAACCRpbXBvcnRzAXABGBgJHgEAQQALGAABAgMEBQYHCAkKCwwNDg8QERITFBUWFwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjQ2LjI");
    const module3 = base64Compile("AGFzbQEAAAABBAFgAAACBQEAAAAACAEA");
    ({ exports: exports0 } = yield instantiateCore(yield module1));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      "wasi:cli/environment@0.2.0": {
        "get-arguments": exports0["1"],
        "get-environment": exports0["0"],
        "initial-cwd": exports0["2"]
      },
      "wasi:cli/exit@0.2.0": {
        exit: trampoline0
      },
      "wasi:cli/stderr@0.2.0": {
        "get-stderr": trampoline6
      },
      "wasi:cli/stdin@0.2.0": {
        "get-stdin": trampoline7
      },
      "wasi:cli/stdout@0.2.0": {
        "get-stdout": trampoline3
      },
      "wasi:clocks/monotonic-clock@0.2.0": {
        now: trampoline4
      },
      "wasi:clocks/wall-clock@0.2.0": {
        now: exports0["6"]
      },
      "wasi:filesystem/preopens@0.2.0": {
        "get-directories": exports0["23"]
      },
      "wasi:filesystem/types@0.2.0": {
        "[method]descriptor.create-directory-at": exports0["8"],
        "[method]descriptor.link-at": exports0["9"],
        "[method]descriptor.open-at": exports0["10"],
        "[method]descriptor.read": exports0["11"],
        "[method]descriptor.read-directory": exports0["12"],
        "[method]descriptor.readlink-at": exports0["13"],
        "[method]descriptor.remove-directory-at": exports0["14"],
        "[method]descriptor.rename-at": exports0["15"],
        "[method]descriptor.stat": exports0["16"],
        "[method]descriptor.stat-at": exports0["17"],
        "[method]descriptor.symlink-at": exports0["18"],
        "[method]descriptor.sync-data": exports0["19"],
        "[method]descriptor.unlink-file-at": exports0["20"],
        "[method]descriptor.write": exports0["21"],
        "[method]directory-entry-stream.read-directory-entry": exports0["22"],
        "[resource-drop]descriptor": trampoline8,
        "[resource-drop]directory-entry-stream": trampoline9
      },
      "wasi:io/streams@0.2.0": {
        "[method]input-stream.blocking-read": exports0["3"],
        "[method]output-stream.blocking-flush": exports0["4"],
        "[method]output-stream.blocking-write-and-flush": exports0["5"],
        "[resource-drop]input-stream": trampoline1,
        "[resource-drop]output-stream": trampoline2
      },
      "wasi:random/random@0.2.0": {
        "get-random-bytes": exports0["7"],
        "get-random-u64": trampoline5
      }
    }));
    memory0 = exports1.memory;
    realloc0 = exports1.cabi_realloc;
    try {
      realloc0Async = WebAssembly.promising(exports1.cabi_realloc);
    } catch (err) {
      realloc0Async = exports1.cabi_realloc;
    }
    ({ exports: exports2 } = yield instantiateCore(yield module2, {
      "": {
        $imports: exports0.$imports,
        "0": trampoline10,
        "1": trampoline11,
        "10": trampoline20,
        "11": trampoline21,
        "12": trampoline22,
        "13": trampoline23,
        "14": trampoline24,
        "15": trampoline25,
        "16": trampoline26,
        "17": trampoline27,
        "18": trampoline28,
        "19": trampoline29,
        "2": trampoline12,
        "20": trampoline30,
        "21": trampoline31,
        "22": trampoline32,
        "23": trampoline33,
        "3": trampoline13,
        "4": trampoline14,
        "5": trampoline15,
        "6": trampoline16,
        "7": trampoline17,
        "8": trampoline18,
        "9": trampoline19
      }
    }));
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      "": {
        "": exports1._initialize
      }
    }));
    run020Run = exports1["wasi:cli/run@0.2.0#run"];
  })();
  let promise, resolve2, reject2;
  function runNext(value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve2) resolve2(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve2 = _resolve, reject2 = _reject));
      value.then(runNext, reject2);
    } catch (e) {
      if (reject2) reject2(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();
await $init;
var run020 = {
  run
};
export {
  run020 as run,
  run020 as "wasi:cli/run@0.2.0"
};
