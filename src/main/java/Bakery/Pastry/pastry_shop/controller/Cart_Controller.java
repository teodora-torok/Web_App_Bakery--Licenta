package Bakery.Pastry.pastry_shop.controller;

import Bakery.Pastry.pastry_shop.io.Cart_Request;
import Bakery.Pastry.pastry_shop.io.Cart_Response;
import Bakery.Pastry.pastry_shop.service.Cart_Service;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor

public class Cart_Controller {

    private final Cart_Service cartService;

    @PostMapping
    public Cart_Response addProductToCart(@RequestBody Cart_Request request) {
        String productID= request.getProductID();
        if(productID==null || productID.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The product ID was not found.");
        }
        return cartService.addProductToCart(request);
    }

    @GetMapping
    public Cart_Response getCart() {
        return cartService.getCart();
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void Cart_Clearing() {
        cartService.Cart_Clearing();
    }

    @PostMapping("/remove")
    public Cart_Response removeProduct(@RequestBody Cart_Request request) {
        String productID= request.getProductID();
        if(productID==null || productID.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The product ID was not found.");
        }
        return cartService.removeProduct(request);
    }
}
