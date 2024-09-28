package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Personne;
import com.example.SpringMongoProject.Service.PersonneServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/personne")
public class PersonneController {

    @Autowired
    private PersonneServices personneServices;

    @PostMapping(value = "/save")
    private String savePersonne(@RequestBody Personne personnes) {

        personneServices.saveorUpdate(personnes);
        return personnes.get_id();
    }

    @GetMapping(value = "/getall")
    public Iterable<Personne> getPersonnes() {
        return personneServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Personne update(@RequestBody Personne personne, @PathVariable(name = "id") String _id) {
        personne.set_id(_id);
        personneServices.saveorUpdate(personne);
        return personne;
    }

    @DeleteMapping("/delete/{id}")
    private void deletePersonne(@PathVariable("id") String _id) {
        personneServices.deletePersonne(_id);
    }


    @RequestMapping("/search/{id}")
    private Personne getPersonnes(@PathVariable(name = "id") String personneid) {
        return personneServices.getPersonneByID(personneid);
    }

}