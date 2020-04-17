package com.mobi.lab.demo.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mobi.lab.demo.config.JwtUserDetailsService;
import com.mobi.lab.demo.config.jwt.TokenUtil;
import com.mobi.lab.demo.model.user.Users;
import com.mobi.lab.demo.model.user.UsersDto;
import com.mobi.lab.demo.security.UserNotActivatedException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class JwtAuthenticationController {

    private final TokenUtil tokenUtil;

    private final JwtUserDetailsService userDetailsService;

    public JwtAuthenticationController(TokenUtil tokenUtil, JwtUserDetailsService userDetailsService) {
        this.tokenUtil = tokenUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * @param httpServletRequest
     * @return account detail of each user for setting up UI profile
     * @Author Mehdi Najafian
     * @Date 23/12/2019
     */
    @RequestMapping(value = "/api/account", method = RequestMethod.GET)
    public String getUserDetails(HttpServletRequest httpServletRequest) {
        String jwtToken = tokenUtil.getJwtFromRequestHeader(httpServletRequest.getHeader("Authorization"));
        return tokenUtil.getUsernameFromToken(jwtToken);
    }


    /**
     * @param userDto
     * @return validate user via username and password
     *         and return JWT Token for authenticating
     * @Author Mehdi Najafian
     */
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody UsersDto userDto) {
        Users user = userDetailsService.save(userDto);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        final String jwt_Token = tokenUtil.createToken(userDetails);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + jwt_Token);
        return new ResponseEntity<>(new JWTToken(jwt_Token), httpHeaders, HttpStatus.OK);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public UserNotActivatedException getException(Exception e) {
        return new UserNotActivatedException(e.getMessage());
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }


    }
}
