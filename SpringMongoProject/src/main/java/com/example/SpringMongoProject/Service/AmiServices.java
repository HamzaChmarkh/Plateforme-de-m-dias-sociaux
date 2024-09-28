package com.example.SpringMongoProject.Service;

import com.example.SpringMongoProject.Entity.Ami;
import com.example.SpringMongoProject.Repo.AmiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmiServices {

    @Autowired
    private AmiRepo repo;

    public void saveorUpdate(Ami amis) {

        repo.save(amis);
    }

    public Iterable<Ami> listAll() {

        return this.repo.findAll();
    }


    public void deleteAmi(String id) {

        repo.deleteById(id);
    }

    public Ami getAmiByID(String amisid) {

        return repo.findById(amisid).get();
    }
}
