package Bakery.Pastry.pastry_shop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AWSConfig {

    //chei access, secret din AWS
    @Value("${aws.access.key}")
    private String access_Key;
    @Value("${aws.secret.key}")
    private String secret_Key;
    @Value("${aws.region}")
    private String region;

    //creare bean pt S3Client. cu S3Client putem incarca imagini in S3bucket
    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(access_Key, secret_Key)))
                .build();
    }
}
