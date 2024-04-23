package com.issue_tracker.issur_tracker.controller;

import com.issue_tracker.issur_tracker.model.Handler;
import com.issue_tracker.issur_tracker.service.HandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/handlers")
public class HandlerController {

    private final HandlerService handlerService;

    @Autowired
    public HandlerController(HandlerService handlerService) {
        this.handlerService = handlerService;
    }

    @GetMapping
    public List<Handler> getAllHandlers() {
        return handlerService.getAllHandlers();
    }

    @PostMapping
    public void addNewHandler(@RequestBody Handler handler) {
        handlerService.addNewHandler(handler);
    }

    @DeleteMapping(path = "{id}")
    public void deleteHandler(@PathVariable("id") Long id) {
        handlerService.deleteHandler(id);
    }

    @PutMapping(path = "{id}")
    public void updateHandler(@PathVariable("id") Long id, @RequestBody Handler updatedHandler) {
        handlerService.updateHandler(id, updatedHandler);
    }
}
