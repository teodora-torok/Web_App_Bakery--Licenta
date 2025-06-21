package Bakery.Pastry.pastry_shop.service;

import Bakery.Pastry.pastry_shop.entity.User_Entity;
import Bakery.Pastry.pastry_shop.repository.User_Repository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor

public class User_Info_Service implements UserDetailsService {

    private final User_Repository userRepository;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User_Entity user= userRepository.findByMail(mail).orElseThrow(()-> new UsernameNotFoundException("This user has not been found"));
        return new User(user.getMail(), user.getPassword(), Collections.emptyList());
    }
}
