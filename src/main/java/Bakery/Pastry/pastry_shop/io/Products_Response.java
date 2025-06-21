/*package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Products_Response {
    private String id;
    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
    private String product_imageUrl;
}*/
package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Products_Response {

    private String product_id;
    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
    private String product_imageUrl;
}
