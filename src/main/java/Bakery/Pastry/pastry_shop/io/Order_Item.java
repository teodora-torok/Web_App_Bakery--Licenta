package Bakery.Pastry.pastry_shop.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class Order_Item {

    private String productID;
    private int Product_Quant;
    private String product_name;
    private String product_description;
    private double product_price;
    private String product_category;
    private String product_imageUrl;
}
