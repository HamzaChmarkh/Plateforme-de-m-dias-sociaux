package com.example.SpringMongoProject.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document
public class Article {

    @Id
    private String _id;
    private String source;
    private String contenu;

    private String date;


    public Article(String _id,String source, String contenu,   String date) {
        this._id = _id;
        this.source = source;
        this.contenu = contenu;
        this.date = date;
    }


    public Article() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }


    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    @Override
    public String toString() {
        return "Article{" +
                "_id='" + _id + '\'' +
                ", source='" + source + '\'' +
                ", contenu='" + contenu + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

}
