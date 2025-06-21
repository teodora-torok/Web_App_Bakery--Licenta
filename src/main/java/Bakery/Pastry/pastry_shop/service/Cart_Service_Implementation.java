package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.entity.Cart_Entity;
import Bakery.Pastry.pastry_shop.io.Cart_Request;
import Bakery.Pastry.pastry_shop.io.Cart_Response;
import Bakery.Pastry.pastry_shop.repository.Cart_Repository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor

public class Cart_Service_Implementation implements Cart_Service{

    private final Cart_Repository cartRepository;
    private final User_Service userService;
    @Override
    public Cart_Response addProductToCart(Cart_Request request) {
        String LoggedID= userService.searchByUserID();
        Optional<Cart_Entity> Optional_Cart= cartRepository.searchByUserID(LoggedID);
        Cart_Entity cart= Optional_Cart.orElseGet(()-> new Cart_Entity(LoggedID, new HashMap<>()));
        Map<String,Integer> cartProducts= cart.getItems();
        cartProducts.put(request.getProductID(), cartProducts.getOrDefault(request.getProductID(), 0) + 1);
        cart.setItems(cartProducts);
        cart= cartRepository.save(cart);
        return convertResponse(cart);
    }

    @Override
    public Cart_Response getCart() {
        String LoggedID= userService.searchByUserID();
        Cart_Entity entity= cartRepository.searchByUserID(LoggedID)
                .orElse(new Cart_Entity(null, LoggedID, new HashMap<>()));
        return convertResponse(entity);
    }

    @Override
    public void Cart_Clearing() {
        String LoggedID= userService.searchByUserID();
        cartRepository.deleteByUserID(LoggedID);
    }

    @Override
    public Cart_Response removeProduct(Cart_Request cartRequest) {
        String LoggedID= userService.searchByUserID();
        Cart_Entity entity= cartRepository.searchByUserID(LoggedID)
                .orElseThrow(() -> new RuntimeException("The cart was not found"));
        Map<String, Integer> cartProducts= entity.getItems();
        if(cartProducts.containsKey(cartRequest.getProductID())) {
            int cart_qty= cartProducts.get(cartRequest.getProductID());
            if(cart_qty>0) {
                cartProducts.put(cartRequest.getProductID(), cart_qty-1);
            } else {
                cartProducts.remove(cartRequest.getProductID());
            }
            entity= cartRepository.save(entity);
        }
        return convertResponse(entity);
    }

    private  Cart_Response convertResponse(Cart_Entity cartEntity) {
        return Cart_Response.builder()
                .id(cartEntity.getId())
                .userID(cartEntity.getUserID())
                .items(cartEntity.getItems())
                .build();
    }
}
