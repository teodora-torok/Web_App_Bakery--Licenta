package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//pt signup
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Register_Response {
    private String id;
    private String name;
    private String mail;
}
