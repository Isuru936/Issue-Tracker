package com.issue_tracker.issur_tracker.service;

import com.issue_tracker.issur_tracker.model.Handler;
import com.issue_tracker.issur_tracker.repository.HandlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HandlerService {
    private final HandlerRepository handlerRepository;

    @Autowired
    public HandlerService(HandlerRepository handlerRepository) {
        this.handlerRepository = handlerRepository;
    }

    public List<Handler> getAllHandlers() {
        return handlerRepository.findAll();
    }

    public Handler getHandlerById(Long id) {
        Optional<Handler> handlerOptional = handlerRepository.findById(id);
        if (handlerOptional.isPresent()) {
            return handlerOptional.get();
        } else {
            throw new IllegalStateException("Handler with id " + id + " not found");
        }
    }

    public void addNewHandler(Handler handler) {
        handlerRepository.save(handler);
    }

    public void deleteHandler(Long id) {
        boolean exists = handlerRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Handler with id " + id + " does not exist");
        }
        handlerRepository.deleteById(id);
    }

    public void updateHandler(Long id, Handler updatedHandler) {
        Handler existingHandler = handlerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Handler with id " + id + " does not exist"));

        // Update email if not null
        String email = updatedHandler.getEmail();
        if (email != null) {
            existingHandler.setEmail(email);
        }

        // Update password if not null
        String password = updatedHandler.getPassword();
        if (password != null) {
            existingHandler.setPassword(password);
        }

        // Update expertise if not null
        String expertise = updatedHandler.getExpertise();
        if (expertise != null) {
            existingHandler.setExpertise(expertise);
        }

        handlerRepository.save(existingHandler);
    }
}
