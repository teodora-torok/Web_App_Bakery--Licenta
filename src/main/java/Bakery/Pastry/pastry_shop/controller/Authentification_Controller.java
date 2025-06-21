package Bakery.Pastry.pastry_shop.controller;

import Bakery.Pastry.pastry_shop.io.Authentification_Request;
import Bakery.Pastry.pastry_shop.io.Authentification_Response;
import Bakery.Pastry.pastry_shop.service.User_Info_Service;
import Bakery.Pastry.pastry_shop.util.JWT_Util;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor

public class Authentification_Controller {

    private final AuthenticationManager authenticationManager;
    private final User_Info_Service userInfoService;
    private final JWT_Util jwtUtil;

    @PostMapping("/login")

    public Authentification_Response login(@RequestBody Authentification_Request request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getMail(), request.getPassword()));
        final UserDetails user_details= userInfoService.loadUserByUsername(request.getMail());
        final String jwtToken= jwtUtil.TokenGenerator(user_details);
        return new Authentification_Response(request.getMail(), jwtToken);
    }
}
