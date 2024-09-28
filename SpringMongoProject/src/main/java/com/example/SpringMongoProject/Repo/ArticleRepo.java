package com.example.SpringMongoProject.Repo;

import com.example.SpringMongoProject.Entity.Article;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepo extends MongoRepository<Article,String> {
}