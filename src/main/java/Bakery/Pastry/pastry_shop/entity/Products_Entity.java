/*package Bakery.Pastry.pastry_shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Products_Entity {
    @Id
    private String id;
    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
    private String product_imageUrl;
}*/

package Bakery.Pastry.pastry_shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Products_Entity {

    @Id
    private String product_id;

    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
    private String product_imageUrl;
}

