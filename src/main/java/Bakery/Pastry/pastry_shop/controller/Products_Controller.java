package Bakery.Pastry.pastry_shop.controller;

import Bakery.Pastry.pastry_shop.io.Products_Request;
import Bakery.Pastry.pastry_shop.io.Products_Response;
import Bakery.Pastry.pastry_shop.service.Products_Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin("*")

public class Products_Controller {

    private final Products_Service products_service;
    @PostMapping
    public Products_Response addProduct(@RequestPart("product") String productString,
                                        @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper= new ObjectMapper();
        Products_Request products_request= null;
        try{
            products_request= objectMapper.readValue(productString, Products_Request.class);
        } catch (JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "JSON format is invalid");
        }
        Products_Response products_response= products_service.addProduct(products_request, file);
        return products_response;
    }

    @GetMapping
    public List<Products_Response> readProduct() {
        return products_service.readProduct();
    }

    @GetMapping("/{product_id}")
    public Products_Response readSingleProduct(@PathVariable String product_id) {
        return products_service.readSingleProduct(product_id);
    }

    @DeleteMapping("/{product_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String product_id) {
        products_service.deleteProduct(product_id);
    }
}
