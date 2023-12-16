package com.korinek.message_app.backend.repository;

import com.korinek.message_app.backend.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatUid(String chatUid);

    @Query(value = "{'chatUid': ?0, 'read': false}", count = true)
    int getNumberOfUnreadMessages(String chatUid);
}
