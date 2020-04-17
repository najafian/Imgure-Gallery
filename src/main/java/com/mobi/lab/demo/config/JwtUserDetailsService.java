package com.mobi.lab.demo.config;

import com.mobi.lab.demo.model.user.Users;
import com.mobi.lab.demo.model.user.UsersDto;
import com.mobi.lab.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = userDao.findByUsername(username);
        if (user.isPresent()) {
            return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(),
                    new ArrayList<>());
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }

    public Users save(UsersDto user) {
        return new Users(user.getUsername(), bcryptEncoder.encode(user.getPassword()));
    }
}
