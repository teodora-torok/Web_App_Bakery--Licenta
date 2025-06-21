package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.io.Cart_Request;
import Bakery.Pastry.pastry_shop.io.Cart_Response;

public interface Cart_Service {

    Cart_Response addProductToCart(Cart_Request request);

    Cart_Response getCart();

    void Cart_Clearing();

    Cart_Response removeProduct(Cart_Request cartRequest);
}
