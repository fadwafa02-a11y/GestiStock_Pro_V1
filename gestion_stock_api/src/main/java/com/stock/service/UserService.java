package com.stock.service;

import com.stock.model.User;
import java.util.List;

public interface UserService {

    User save(User user);

    List<User> findAll();

    User update(String id, User updated);

    void delete(String id);
}
