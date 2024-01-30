package com.korinek.message_app.backend.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.configurationprocessor.json.JSONException;
import org.json.JSONException;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfiguration {

    private final FirebaseConfigurationResource firebaseConfigurationResource;

    @Autowired
    public FirebaseConfiguration(FirebaseConfigurationResource firebaseConfigurationResource) {
        this.firebaseConfigurationResource = firebaseConfigurationResource;
    }

    @PostConstruct
    public void initialize() throws IOException {
        String jsonContent = "";
        try {
            jsonContent = this.firebaseConfigurationResource.getJsonContent();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try (InputStream serviceAccount = new ByteArrayInputStream(jsonContent.getBytes());) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            FirebaseApp.initializeApp(options);
        } catch(IOException e) {
            e.printStackTrace();
        }
    }
}
