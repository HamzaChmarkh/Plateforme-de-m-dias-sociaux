package com.example.SpringMongoProject.Service;

import com.example.SpringMongoProject.Entity.Article;
import com.example.SpringMongoProject.Repo.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleServices {

    @Autowired
    private ArticleRepo repo;

    public void saveorUpdate(Article articles) {

        repo.save(articles);
    }

    public Iterable<Article> listAll() {

        return this.repo.findAll();
    }


    public void deleteArticle(String id) {

        repo.deleteById(id);
    }

    public Article getArticleByID(String articleid) {

        return repo.findById(articleid).get();
    }
}
