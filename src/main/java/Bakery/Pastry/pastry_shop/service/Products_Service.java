

package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.io.Products_Request;
import Bakery.Pastry.pastry_shop.io.Products_Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface Products_Service {

    String uploadFile(MultipartFile file);

    //creare service pentru a incarca fisierul in s3bucket
    Products_Response addProduct(Products_Request products_request, MultipartFile file);

    //metoda ca sa citim detaliile produsului din db
    List<Products_Response> readProduct();

    //metoda read single objects, citire info despre un anumit produs
    Products_Response readSingleProduct(String product_id);

    //metoda pentru a sterge files din db si s3bucket
    boolean deleteFile(String filename);

       void deleteProduct(String product_id);
}

