package Bakery.Pastry.pastry_shop.controller;

import Bakery.Pastry.pastry_shop.io.Register_Request;
import Bakery.Pastry.pastry_shop.io.Register_Response;
import Bakery.Pastry.pastry_shop.service.User_Service;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class User_Controller {

    private final User_Service user_service;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Register_Response register(@RequestBody Register_Request request) {
        return user_service.registerNewUser(request);
    }
}
