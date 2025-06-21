package Bakery.Pastry.pastry_shop.filters;

import Bakery.Pastry.pastry_shop.util.JWT_Util;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component

public class JWT_Filter_Auth extends OncePerRequestFilter {

    @Autowired
    private JWT_Util jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String Authorization_Header= request.getHeader("Authorization");
        if(StringUtils.hasText(Authorization_Header) && Authorization_Header.startsWith("Bearer ")) {
            String token= Authorization_Header.substring(7);
            String mail= jwtUtil.Extract_Username(token);
            if(mail!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
                UserDetails userDetails= userDetailsService.loadUserByUsername(mail);
                if(jwtUtil.TokenValidation(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }

            }
        }
        filterChain.doFilter(request,response);
    }
}
