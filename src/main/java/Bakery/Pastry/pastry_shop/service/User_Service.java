package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.io.Register_Request;
import Bakery.Pastry.pastry_shop.io.Register_Response;

public interface User_Service {
    Register_Response registerNewUser(Register_Request request);

    String searchByUserID();
}
