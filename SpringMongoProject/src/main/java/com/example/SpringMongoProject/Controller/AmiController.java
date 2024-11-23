package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Ami;
import com.example.SpringMongoProject.Service.AmiServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/ami")
public class AmiController {

    @Autowired
    private AmiServices amiServices;

    @PostMapping(value = "/save")
    private String saveAmi(@RequestBody Ami amis) {

        amiServices.saveorUpdate(amis);
        return amis.get_id();
    }

    @GetMapping(value = "/getall")
    public Iterable<Ami> getAmis() {
        return amiServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Ami update(@RequestBody Ami ami, @PathVariable(name = "id") String _id) {
        ami.set_id(_id);
        amiServices.saveorUpdate(ami);
        return ami;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteAmi(@PathVariable("id") String _id) {
        amiServices.deleteAmi(_id);
    }


    @RequestMapping("/search/{id}")
    private Ami getAmis(@PathVariable(name = "id") String amiid) {
        return amiServices.getAmiByID(amiid);
    }


    @GetMapping(value = "/getallString")
    public String test() {
        return "hamza";
    }
}