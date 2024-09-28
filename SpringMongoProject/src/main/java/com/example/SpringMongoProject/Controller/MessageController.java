package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Message;
import com.example.SpringMongoProject.Service.MessageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/message")
public class MessageController {

    @Autowired
    private MessageServices messageServices;

    @PostMapping(value = "/save")
    private String saveMessage(@RequestBody Message messages) {

        messageServices.saveorUpdate(messages);
        return messages.get_id();
    }

    @GetMapping(value = "/getall")
    public Iterable<Message> getMessages() {
        return messageServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Message update(@RequestBody Message message, @PathVariable(name = "id") String _id) {
        message.set_id(_id);
        messageServices.saveorUpdate(message);
        return message;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteMessage(@PathVariable("id") String _id) {
        messageServices.deleteMessage(_id);
    }


    @RequestMapping("/search/{id}")
    private Message getMessages(@PathVariable(name = "id") String messageid) {
        return messageServices.getMessageByID(messageid);
    }

}