package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.entity.Products_Entity;
import Bakery.Pastry.pastry_shop.io.Products_Request;
import Bakery.Pastry.pastry_shop.io.Products_Response;
import Bakery.Pastry.pastry_shop.repository.Products_Repository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service

public class Products_Service_Implementation implements Products_Service {

    @Autowired
    private S3Client s3Client;
    @Autowired
    private Products_Repository products_Repository;

    @Value("${aws.s3.bucketname}")
    private String bucket_name;

    @Override
    public String uploadFile(MultipartFile file) {
        String filename_extension = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String product_key = UUID.randomUUID().toString() + "." + filename_extension;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket_name)
                    .key(product_key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(
                    putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return "http://" + bucket_name + ".s3.amazonaws.com/" + product_key;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failure while uploading the product file");
            }

        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading product file", ex);
        }
    }

    @Override
    public Products_Response addProduct(Products_Request products_request, MultipartFile file) {
        Products_Entity new_product_entity = convertToEntity(products_request);
        String product_imageUrl = uploadFile(file);
        new_product_entity.setProduct_imageUrl(product_imageUrl);

        new_product_entity = products_Repository.save(new_product_entity);

        return convertToResponse(new_product_entity);
    }

    @Override
    public List<Products_Response> readProduct() {
        List<Products_Entity> databaseEntry= products_Repository.findAll();
        return databaseEntry.stream().map(object-> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public Products_Response readSingleProduct(String product_id) {
        Products_Entity existingProduct= products_Repository.findById(product_id).orElseThrow(()-> new RuntimeException("Product couldn't be found by the provided ID"));
        return convertToResponse(existingProduct);
    }

    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest= DeleteObjectRequest.builder()
                .bucket(bucket_name)
                .key(filename)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteProduct(String product_id) {
        Products_Response products_response= readSingleProduct(product_id);
        String imageUrl= products_response.getProduct_imageUrl();
        String filename= imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean fileDeleted= deleteFile(filename);
        if(fileDeleted) {
            products_Repository.deleteById(products_response.getProduct_id());
        }
    }

    private Products_Entity convertToEntity(Products_Request products_request) {
        return Products_Entity.builder()
                .product_name(products_request.getProduct_name())
                .product_description(products_request.getProduct_description())
                .product_category(products_request.getProduct_category())
                .product_price(products_request.getProduct_price())
                .build();
    }

    private Products_Response convertToResponse(Products_Entity products_entity) {
        return Products_Response.builder()
                .product_id(products_entity.getProduct_id())
                .product_name(products_entity.getProduct_name())
                .product_description(products_entity.getProduct_description())
                .product_category(products_entity.getProduct_category())
                .product_price(products_entity.getProduct_price())
                .product_imageUrl(products_entity.getProduct_imageUrl())
                .build();
    }
}

