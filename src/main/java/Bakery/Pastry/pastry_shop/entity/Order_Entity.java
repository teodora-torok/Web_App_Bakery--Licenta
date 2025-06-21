package Bakery.Pastry.pastry_shop.entity;

import Bakery.Pastry.pastry_shop.io.Order_Item;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder

public class Order_Entity {
    @Id
    private String id;
    private String userID;
    private String userPhone;
    private String mail;
    private String userAddr;
    private List<Order_Item> ordered_items;
    private double products_amount;
    private String transactionStatus;
    private String stripeOrderID;
    private String Stripe_Signature;
    private String Order_State;
    private String stripePaymentID;
}
