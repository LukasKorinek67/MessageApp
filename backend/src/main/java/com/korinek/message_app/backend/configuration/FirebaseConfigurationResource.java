package com.korinek.message_app.backend.configuration;

import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.configurationprocessor.json.JSONException;
import org.json.JSONException;
import org.springframework.stereotype.Component;

@Component
public class FirebaseConfigurationResource {

    @Value("${FIREBASE_ADMIN_TYPE}")
    String firebaseType;
    @Value("${FIREBASE_ADMIN_PROJECT_ID}")
    String firebaseProjectId;
    @Value("${FIREBASE_ADMIN_PRIVATE_KEY_ID}")
    String firebasePrivateKeyId;
    @Value("${FIREBASE_ADMIN_PRIVATE_KEY}")
    String firebasePrivateKey;
    @Value("${FIREBASE_ADMIN_CLIENT_EMAIL}")
    String firebaseClientEmail;
    @Value("${FIREBASE_ADMIN_CLIENT_ID}")
    String firebaseClientId;
    @Value("${FIREBASE_ADMIN_AUTH_URI}")
    String firebaseAuthUri;
    @Value("${FIREBASE_ADMIN_TOKEN_URI}")
    String firebaseTokenUri;
    @Value("${FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL}")
    String firebaseAuthProviderX509;
    @Value("${FIREBASE_ADMIN_CLIENT_X509_CERT_URL}")
    String firebaseClientX509;
    @Value("${FIREBASE_ADMIN_UNIVERSE_DOMAIN}")
    String firebaseUniverseDomain;

    public String getJsonContent() throws JSONException {
        String jsonContent = """
        {
            "type": "%s",
            "project_id": "%s",
            "private_key_id": "%s",
            "private_key": %s,
            "client_email": "%s",
            "client_id": "%s",
            "auth_uri": "%s",
            "token_uri": "%s",
            "auth_provider_x509_cert_url": "%s",
            "client_x509_cert_url": "%s",
            "universe_domain": "%s"
        }
        """.formatted(this.firebaseType, this.firebaseProjectId, this.firebasePrivateKeyId, this.firebasePrivateKey,
                this.firebaseClientEmail, this.firebaseClientId, this.firebaseAuthUri, this.firebaseTokenUri, this.firebaseAuthProviderX509,
                this.firebaseClientX509, this.firebaseUniverseDomain);
        return jsonContent;
    }
}
