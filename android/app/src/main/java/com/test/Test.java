package com.test;

import com.socketio.SocketIoModule;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by mytream on 17/8/2.
 */

public class Test {
    public static void main(String[] args) throws URISyntaxException {
        String host = "http://192.168.199.135:8080/socket.io";

        final Socket socket = IO.socket("http://192.168.199.135:8080");
        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                socket.emit("foo", "hi");
                socket.disconnect();
            }

        }).on("event", new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println(args);
            }

        }).on("first_connect", new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println(args);
            }

        }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {}

        });
        socket.connect();
    }
}
