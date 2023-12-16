package com.korinek.message_app.backend.repository;

import com.korinek.message_app.backend.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatRepository extends MongoRepository<Chat, Integer> {
    Chat findByUid(String uid);
    @Query("{'users.uid': ?0}")
    List<Chat> findByUsersUid(String userUid);
}
