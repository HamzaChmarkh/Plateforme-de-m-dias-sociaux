package com.example.SpringMongoProject.Service;

import com.example.SpringMongoProject.Entity.Message;
import com.example.SpringMongoProject.Repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServices {

    @Autowired
    private MessageRepo repo;

    public void saveorUpdate(Message messages) {

        repo.save(messages);
    }

    public Iterable<Message> listAll() {

        return this.repo.findAll();
    }


    public void deleteMessage(String id) {

        repo.deleteById(id);
    }

    public Message getMessageByID(String messageid) {

        return repo.findById(messageid).get();
    }
}
