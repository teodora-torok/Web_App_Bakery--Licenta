package Bakery.Pastry.pastry_shop.controller;

import Bakery.Pastry.pastry_shop.io.Order_Request;
import Bakery.Pastry.pastry_shop.io.Order_Response;
import Bakery.Pastry.pastry_shop.service.Order_Service;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor

public class Order_Controller {
    private final Order_Service orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Order_Response createPaymentOrder(@RequestBody Order_Request request) {
        Order_Response response= orderService.createPaymentOrder(request);
        return response;
    }

    @PostMapping("/verify")
    public void paymentVerification(@RequestBody Map<String, String> payment_data) {
        orderService.paymentVerification(payment_data, "succeeded");
    }

    @GetMapping
    public List<Order_Response> getOrders() {
        return orderService.getUser_Order();
    }

    @DeleteMapping("/{orderID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove_Order(@PathVariable String orderID) {
        orderService.remove_Order(orderID);
    }

    //pt admin panel
    @GetMapping("/all")
    public List<Order_Response> getAllUsersOrders() {
        return orderService.getAllOrders();
    }

    //tot pt admin panel ca adminul updateaza statusul
    @PatchMapping("/status/{orderID}")
    public void update_OrderStatus(@PathVariable String orderID, @RequestParam String status) {
        orderService.Update_OrderStatus(orderID, status);
    }
}
