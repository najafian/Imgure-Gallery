package com.mobi.lab.demo.security;

import org.springframework.security.core.AuthenticationException;

/**
 * This exception is thrown in case of a not activated user trying to authenticate.
 */
public class UserNotActivatedException extends AuthenticationException {

    private static final long serialVersionUID = 1L;

    /**
     * @param message
     * @Author Mehdi Najafian
     * @Date 24/12/2019
     * @Description every controller exceptions should be wrapped and customized, then return it to UI
     */
    public UserNotActivatedException(String message) {
        super(message);
    }
}
