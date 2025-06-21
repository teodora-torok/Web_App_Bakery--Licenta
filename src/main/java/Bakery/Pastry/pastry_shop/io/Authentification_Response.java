package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Getter;

//pt login
@Getter
@AllArgsConstructor

public class Authentification_Response {
    private String mail;
    private String token;
}
