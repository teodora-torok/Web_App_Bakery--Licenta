package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.entity.User_Entity;
import Bakery.Pastry.pastry_shop.io.Register_Request;
import Bakery.Pastry.pastry_shop.io.Register_Response;
import Bakery.Pastry.pastry_shop.repository.User_Repository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class User_Service_Implementation implements User_Service{

    private final User_Repository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Facade_Auth facadeAuth;

    @Override
    public Register_Response registerNewUser(Register_Request request) {
        User_Entity userNew= entityConvert(request);
        userNew= userRepository.save(userNew);
        return responseConvert(userNew);
    }

    @Override
    public String searchByUserID() {
        String LoggedMail = facadeAuth.getAuthentication().getName();
        User_Entity LoggedUser = userRepository.findByMail(LoggedMail).orElseThrow(()-> new UsernameNotFoundException("The user was not found"));
        return LoggedUser.getId();
    }

    private User_Entity entityConvert(Register_Request request) {
        return User_Entity.builder()
                .mail(request.getMail()).password(passwordEncoder.encode(request.getPassword())).name(request.getName()).build();
    }

    private Register_Response responseConvert(User_Entity userRegistered) {
        return Register_Response.builder()
                .id(userRegistered.getId()).name(userRegistered.getName()).mail(userRegistered.getMail()).build();
    }
}
