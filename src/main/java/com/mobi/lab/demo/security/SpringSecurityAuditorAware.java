package com.mobi.lab.demo.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.ManagedBean;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Optional;

@ManagedBean
@EnableJpaAuditing
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    private final HttpServletRequest httpServletRequest;

    public SpringSecurityAuditorAware(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.ofNullable(httpServletRequest.getUserPrincipal())
                .map(Principal::getName);
    }
}
