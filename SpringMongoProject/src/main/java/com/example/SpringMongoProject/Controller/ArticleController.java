package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Article;
import com.example.SpringMongoProject.Service.ArticleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/article")
public class ArticleController {

    @Autowired
    private ArticleServices articleServices;

    @PostMapping(value = "/save")
    private String saveArticle(@RequestBody Article articles) {

        articleServices.saveorUpdate(articles);
        return articles.get_id();
    }

    @GetMapping(value = "/getall")
    public Iterable<Article> getArticles() {
        return articleServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Article update(@RequestBody Article article, @PathVariable(name = "id") String _id) {
        article.set_id(_id);
        articleServices.saveorUpdate(article);
        return article;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteArticle(@PathVariable("id") String _id) {
        articleServices.deleteArticle(_id);
    }


    @RequestMapping("/search/{id}")
    private Article getArticles(@PathVariable(name = "id") String articleid) {
        return articleServices.getArticleByID(articleid);
    }

}