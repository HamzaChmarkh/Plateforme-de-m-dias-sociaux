package com.example.SpringMongoProject.Service;

import com.example.SpringMongoProject.Entity.Personne;
import com.example.SpringMongoProject.Repo.PersonneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonneServices {

    @Autowired
    private PersonneRepo repo;

    public void saveorUpdate(Personne personnes) {

        repo.save(personnes);
    }

    public Iterable<Personne> listAll() {

        return this.repo.findAll();
    }


    public void deletePersonne(String id) {

        repo.deleteById(id);
    }

    public Personne getPersonneByID(String personneid) {

        return repo.findById(personneid).get();
    }
}
