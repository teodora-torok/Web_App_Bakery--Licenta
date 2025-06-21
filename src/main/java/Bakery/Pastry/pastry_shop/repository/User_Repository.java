package Bakery.Pastry.pastry_shop.repository;

import Bakery.Pastry.pastry_shop.entity.User_Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface User_Repository extends MongoRepository<User_Entity, String> {
    Optional<User_Entity> findByMail(String mail);
}
