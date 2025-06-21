/*package Bakery.Pastry.pastry_shop.repository;

import Bakery.Pastry.pastry_shop.entity.Products_Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Products_Repository extends MongoRepository<Products_Entity,String> {
}*/


package Bakery.Pastry.pastry_shop.repository;

import Bakery.Pastry.pastry_shop.entity.Products_Entity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Products_Repository extends MongoRepository<Products_Entity, String> {
}
