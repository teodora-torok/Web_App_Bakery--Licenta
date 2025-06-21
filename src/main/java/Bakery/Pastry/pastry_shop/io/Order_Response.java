package Bakery.Pastry.pastry_shop.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class Order_Response {
    private String id;
    private String userID;
    private String userPhone;
    private String mail;
    private String userAddr;
    private double products_amount;
    private String transactionStatus;
    private String stripeOrderID;
    private String Order_State;
    private String clientSecret;
    private List<Order_Item> ordered_items;

}
