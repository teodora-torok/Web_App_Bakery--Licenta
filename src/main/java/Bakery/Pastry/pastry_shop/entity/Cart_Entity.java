package Bakery.Pastry.pastry_shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "carts")

public class Cart_Entity {
    @Id
    private String id;
    private String userID;
    private Map<String, Integer> items = new HashMap<>();

    public Cart_Entity(String userID, Map<String, Integer> items) {
        this.userID=userID;
        this.items=items;
    }

}
