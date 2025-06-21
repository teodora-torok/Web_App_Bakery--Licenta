package Bakery.Pastry.pastry_shop.io;
//pt login
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Authentification_Request {
    private String mail;
    private String password;
}
