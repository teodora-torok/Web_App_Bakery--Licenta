/*package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//stocare detalii produse
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Products_Request {
    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;

}*/

package Bakery.Pastry.pastry_shop.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Products_Request {

    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
}
