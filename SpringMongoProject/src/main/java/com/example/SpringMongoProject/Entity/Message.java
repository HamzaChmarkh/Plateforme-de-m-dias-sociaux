package com.example.SpringMongoProject.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document
public class Message {

    @Id
    private String _id;
    private String contenu;
    private String destination;

    private String source;

    private String date;


    public Message(String _id, String contenu, String destination, String source, String date) {
        this._id = _id;
        this.contenu = contenu;
        this.destination = destination;
        this.source = source;
        this.date = date;
    }


    public Message() {
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

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
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
        return "Message{" +
                "_id='" + _id + '\'' +
                ", contenu='" + contenu + '\'' +
                ", destination='" + destination + '\'' +
                ", source='" + source + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

}
