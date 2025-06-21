package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Cart_Request {
    private String userID;
    private String productID;
}
