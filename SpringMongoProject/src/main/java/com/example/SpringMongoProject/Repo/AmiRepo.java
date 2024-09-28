package com.example.SpringMongoProject.Repo;

import com.example.SpringMongoProject.Entity.Ami;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmiRepo extends MongoRepository<Ami,String> {
}