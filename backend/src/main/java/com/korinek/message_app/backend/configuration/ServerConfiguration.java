package com.korinek.message_app.backend.configuration;

import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "server")
public class ServerConfiguration {

    @Getter
    @Value("${server.port}")
    private static int port;


}
