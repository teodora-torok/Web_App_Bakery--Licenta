package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.entity.Order_Entity;
import Bakery.Pastry.pastry_shop.io.Order_Request;
import Bakery.Pastry.pastry_shop.io.Order_Response;
import Bakery.Pastry.pastry_shop.repository.Cart_Repository;
import Bakery.Pastry.pastry_shop.repository.Order_Repository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.stripe.Stripe;
import lombok.AllArgsConstructor;
import netscape.javascript.JSObject;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class Order_Service_Implementation implements Order_Service{

    @Autowired
    private Order_Repository orderRepository;
    @Autowired
    private User_Service userService;
    @Autowired
    private Cart_Repository cartRepository;

    @Value("${stripe_key}")
    private String stripeKey;

    @Value("${stripe_secretKey}")
    private String stripeSecretKey;


    @Override
    public Order_Response createPaymentOrder(Order_Request request) {
        Order_Entity new_order = convertToEntity(request);
        new_order = orderRepository.save(new_order);

        // Set Stripe API key
        Stripe.apiKey = stripeSecretKey;

        String LoggedID= userService.searchByUserID();
        new_order.setUserID(LoggedID);
        new_order= orderRepository.save(new_order);

        // Stripe requires amount in cents
        long amountInCents = (long) (new_order.getProducts_amount() * 100);

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("ron") // Romanian Leu
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Save Stripe PaymentIntent ID
            new_order.setStripeOrderID(paymentIntent.getId());
            new_order.setTransactionStatus("created");
            orderRepository.save(new_order);

            return Order_Response.builder()
                    .id(new_order.getId())
                    .userID(new_order.getUserID())
                    .userAddr(new_order.getUserAddr())
                    .products_amount(new_order.getProducts_amount())
                    .transactionStatus(new_order.getTransactionStatus())
                    .stripeOrderID(new_order.getStripeOrderID())
                    .Order_State(new_order.getOrder_State())
                    .clientSecret(paymentIntent.getClientSecret())
                    .mail(new_order.getMail())
                    .userPhone(new_order.getUserPhone())
                    .ordered_items(new_order.getOrdered_items())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Stripe PaymentIntent creation failed", e);
        }
    }

    @Override
    public void paymentVerification(Map<String, String> payment_data, String status) {
        String stripeOrderID= payment_data.get("stripeOrderID");

        Order_Entity existing_order= orderRepository.findByStripeOrderID(stripeOrderID)
                .orElseThrow(() -> new RuntimeException("The order was not found."));

        existing_order.setTransactionStatus(status);
        //existing_order.setStripe_Signature(payment_data.get("stripe_signature"));
        //existing_order.setStripePaymentID(payment_data.get("stripePaymentID"));
        orderRepository.save(existing_order);

        if ("succeeded".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserID(existing_order.getUserID());
        }
    }

    @Override
    public List<Order_Response> getUser_Order() {
        String LoggedID= userService.searchByUserID();
        List<Order_Entity> List_OrderEntity= orderRepository.searchByUserID(LoggedID);
        return List_OrderEntity.stream().map(entity->convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void remove_Order(String orderID) {
        orderRepository.deleteById(orderID);
    }

    @Override
    public List<Order_Response> getAllOrders() {
       List<Order_Entity> List_OrderEntity= orderRepository.findAll();
       return List_OrderEntity.stream().map(entity->convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void Update_OrderStatus(String orderID, String status) {
        Order_Entity entity= orderRepository.findById(orderID)
                .orElseThrow(()->new RuntimeException("The order was not found."));
        entity.setOrder_State(status);
        orderRepository.save(entity);
    }

    private Order_Response convertToResponse(Order_Entity new_order) {
        return Order_Response.builder()
                .id(new_order.getId())
                .products_amount(new_order.getProducts_amount())
                .userAddr(new_order.getUserAddr())
                .userID(new_order.getUserID())
                .stripeOrderID(new_order.getStripeOrderID())
                .transactionStatus(new_order.getTransactionStatus())
                .mail(new_order.getMail())
                .userPhone(new_order.getUserPhone())
                .ordered_items(new_order.getOrdered_items())
                .Order_State(new_order.getOrder_State())
                .build();
    }




    /*@Override
    public Order_Response createPaymentOrder(Order_Request request) throws  razorpayException{
        Order_Entity new_order=  convertToEntity(request);
        new_order= orderRepository.save(new_order);

        //order with stripe payment
        RazorpayClient razorpayClient= new RazorpayClient(RAZORPAY_KEY< RAZORPAY_SECRET);
        JsonObject orderRequest= new JsonObject();
        orderRequest.put("products_amount", new_order.getProducts_amount());
        orderRequest.put("currency", "RON");
        orderRequest.put("paymentCapture", 1);
Order razorpayOrder= razorpayClient.orders.create(orderRequest);
new_order.setrazorpayOredrId(razorpayOrder.get("id"));

    }*/

    private Order_Entity convertToEntity(Order_Request request) {
        return Order_Entity.builder()
                .userAddr(request.getUserAddr())
                .products_amount(request.getProducts_amount())
                .ordered_items(request.getOrdered_items())
                .mail(request.getMail())
                .userPhone(request.getUserPhone())
                .Order_State(request.getOrder_State())
                .build();
    }
}
