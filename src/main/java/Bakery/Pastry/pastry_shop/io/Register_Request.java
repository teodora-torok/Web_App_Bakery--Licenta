package Bakery.Pastry.pastry_shop.io;
//pt signip

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Register_Request {
    private String name;
    private String mail;
    private String password;
}
