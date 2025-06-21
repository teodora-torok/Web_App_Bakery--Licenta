package Bakery.Pastry.pastry_shop.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class Order_Request {
    private List<Order_Item> ordered_items;
    private String userAddr;
    private double products_amount;
    private String userPhone;
    private String mail;
    private String Order_State;
}
