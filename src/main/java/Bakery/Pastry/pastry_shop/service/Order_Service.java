package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.io.Order_Request;
import Bakery.Pastry.pastry_shop.io.Order_Response;

import java.util.List;
import java.util.Map;

public interface Order_Service {
    Order_Response createPaymentOrder(Order_Request request);

    void paymentVerification(Map<String, String> payment_data, String status);

    List<Order_Response>getUser_Order(); //pt logged user

    void remove_Order(String orderID);

    //pt admin panel
     List<Order_Response> getAllOrders();

     void Update_OrderStatus(String orderID, String status);

}
