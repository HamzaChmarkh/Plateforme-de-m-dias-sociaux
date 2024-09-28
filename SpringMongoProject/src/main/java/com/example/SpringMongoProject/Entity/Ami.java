package com.example.SpringMongoProject.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document
public class Ami {

    @Id
    private String _id;
    private String nom_prenom;
    private String nom_prenom_2;

    private String date;


    public Ami(String _id,String nom_prenom, String nom_prenom_2,   String date) {
        this._id = _id;
        this.nom_prenom = nom_prenom;
        this.nom_prenom_2 = nom_prenom_2;
        this.date = date;
    }


    public Ami() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getNom_prenom_2() {
        return nom_prenom_2;
    }

    public void setNom_prenom_2(String nom_prenom_2) {
        this.nom_prenom_2 = nom_prenom_2;
    }


    public String getNom_prenom() {
        return nom_prenom;
    }

    public void setNom_prenom(String nom_prenom) {
        this.nom_prenom = nom_prenom;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    @Override
    public String toString() {
        return "Ami{" +
                "_id='" + _id + '\'' +
                ", nom_prenom='" + nom_prenom + '\'' +
                ", nom_prenom_2='" + nom_prenom_2 + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

}
