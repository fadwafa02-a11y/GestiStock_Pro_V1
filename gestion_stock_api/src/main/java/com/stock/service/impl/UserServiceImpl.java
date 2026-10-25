package com.stock.service.impl;

import com.stock.model.User;
import com.stock.repository.UserRepository;
import com.stock.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public User update(String id, User updated) {
        return repository.findById(id)
                .map(u -> {
                    u.setUsername(updated.getUsername());
                    u.setPassword(updated.getPassword());
                    u.setRole(updated.getRole());
                    return repository.save(u);
                })
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé : " + id));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
