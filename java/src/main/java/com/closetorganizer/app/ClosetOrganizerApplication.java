package com.closetorganizer.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.closetorganizer.app.model")
@EnableJpaRepositories(basePackages = "com.closetorganizer.app.repository")
public class ClosetOrganizerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClosetOrganizerApplication.class, args);
    }
}
