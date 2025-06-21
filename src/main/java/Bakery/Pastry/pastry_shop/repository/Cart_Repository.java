package Bakery.Pastry.pastry_shop.repository;

import Bakery.Pastry.pastry_shop.entity.Cart_Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface Cart_Repository extends MongoRepository<Cart_Entity, String> {
    Optional <Cart_Entity> searchByUserID(String userID);

    void deleteByUserID (String userID);
}
