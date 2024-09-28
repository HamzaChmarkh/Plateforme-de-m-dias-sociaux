package com.example.SpringMongoProject.Repo;

import com.example.SpringMongoProject.Entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends MongoRepository<Message,String> {
}