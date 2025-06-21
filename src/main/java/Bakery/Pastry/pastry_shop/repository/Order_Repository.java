package Bakery.Pastry.pastry_shop.repository;

import Bakery.Pastry.pastry_shop.entity.Order_Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Order_Repository extends MongoRepository<Order_Entity, String> {
    List<Order_Entity> searchByUserID(String userID);
    Optional<Order_Entity> findByStripeOrderID(String stripeOrderID);
}
