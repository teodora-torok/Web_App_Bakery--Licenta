package Bakery.Pastry.pastry_shop.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component

public class JWT_Util {
    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    public String TokenGenerator(UserDetails user_details) {
        Map<String, Object> claims = new HashMap<>();
        return TokenCreator(claims, user_details.getUsername());
    }

    private String TokenCreator(Map<String, Object> claims, String subject) {
        /*return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10)) //10 h expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();*/
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String Extract_Username(String token) {
        return Extract_Claim(token, Claims::getSubject);
    }

    public Date Extract_Expiration (String token) {
        return Extract_Claim(token, Claims::getExpiration);
    }

    public <T> T Extract_Claim(String token, Function<Claims, T> claims_Resolver) {
        final Claims claims= Extract_AllClaims(token);
        return claims_Resolver.apply(claims);
    }

    private Claims Extract_AllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean TokenExpired(String token) {
        return Extract_Expiration(token).before(new Date());
    }

    public Boolean TokenValidation(String token, UserDetails user_details) {
        final String username = Extract_Username(token);
        return (username.equals(user_details.getUsername()) && !TokenExpired(token));
    }
}
