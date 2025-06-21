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

public class Cart_Response {
    private String id;
    private String userID;
    private Map<String, Integer> items = new HashMap<>();
}
