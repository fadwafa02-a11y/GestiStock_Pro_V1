package com.stock.controller;

import com.stock.model.User;
import com.stock.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public User add(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public User update(@PathVariable String id, @RequestBody User u) {
        return service.update(id, u);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
