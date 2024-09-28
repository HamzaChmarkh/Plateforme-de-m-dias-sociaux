package com.example.SpringMongoProject.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Personne {

    @Id
    private String _id;
    private String prenom ;
    private String nom;
    private String email;
    private String password;

    private String image;








    public Personne(String _id, String prenom, String nom,String email, String password,  String image) {
        this._id = _id;
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.image = image;


    }


    public Personne() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setPom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    @Override
    public String toString() {
        return "Personne{" +
                "_id='" + _id + '\'' +
                ", prenom='" + prenom + '\'' +
                ", nom='" + nom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", image='" + image + '\'' +


                '}';
    }

}
