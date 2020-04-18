package com.mobi.lab.demo.service.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

@Service
public class RestService extends RestTemplate {
    private RestServiceURI prefixRestUrl;
    @Value("${imgur.clientID}")
    private String clientID;

    public void setURI(RestServiceURI prefixRestUrl) {
        this.prefixRestUrl = prefixRestUrl;
    }

    public <T> T getAction(String suffixUrl, Class<T> clazz) {
        T forEntity = super.getForEntity(prefixRestUrl.getUri() + suffixUrl, clazz).getBody();
        return forEntity;
    }

    public <T> T getActionWithParameters(String url, Class<T> clazz, Map<String, Object> params) {
        HttpHeaders headers = getHttpHeaders();
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        params.entrySet().stream().forEachOrdered(o -> builder.queryParam(o.getKey(), o.getValue()));
        HttpEntity<?> entity = new HttpEntity<>(headers);
        try {
            URI uri = new URI(builder.toUriString());
            return super.exchange(
                uri,
                HttpMethod.GET,
                entity,
                clazz).getBody();

        } catch (URISyntaxException e) {
            e.printStackTrace();
            return null;
        }
    }

    public <T> T postActionWithParameters(String url, Class<T> clazz, Map<String, Object> body, Map<String, Object> headerParams) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        headerParams.entrySet().stream().forEachOrdered(o -> builder.queryParam(o.getKey(), o.getValue()));
        HttpEntity<T> response = setAndReturnHttpEntity(builder, clazz, body, HttpMethod.POST);
        return response.getBody();
    }

    @NotNull
    private <T> HttpEntity<T> setAndReturnHttpEntity(UriComponentsBuilder builder, Class<T> clazz, Map<String, Object> body, HttpMethod httpMethod) {
        HttpHeaders headers = getHttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(body, headers);
        return super.exchange(
            builder.toUriString(),
            httpMethod,
            entity,
            clazz);
    }

    @org.jetbrains.annotations.NotNull
    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", "Client-ID " + clientID);
        return headers;
    }

    public <T> T updateActionWithParameters(String url, Class<T> clazz, Map<String, Object> body) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        HttpEntity<T> response = setAndReturnHttpEntity(builder, clazz, body, HttpMethod.PUT);
        return response.getBody();
    }

    public <T> T deleteActionWithParameters(String url, Class<T> clazz, Map<String, Object> params) {
        HttpHeaders headers = getHttpHeaders();
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        params.entrySet().stream().forEachOrdered(o -> builder.queryParam(o.getKey(), o.getValue()));
        HttpEntity<?> entity = new HttpEntity<>(headers);
        HttpEntity<T> response = super.exchange(
            builder.toUriString(),
            HttpMethod.DELETE,
            entity,
            clazz);
        return response.getBody();
    }

    public <T> T postAction(String suffixUrl, Class<T> clazz, JSONObject requestValue) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestValue.toString(), headers);
        T body = super.exchange(prefixRestUrl.getUri() + suffixUrl, HttpMethod.POST, request, clazz).getBody();
        return body;
    }

    public <T> T updateAction(String suffixUrl, Class<T> clazz, Object requestValue) {
        HttpEntity<?> httpEntity = new HttpEntity<>(requestValue);
        T forEntity = super.exchange(prefixRestUrl.getUri() + suffixUrl, HttpMethod.PUT, httpEntity, clazz).getBody();
        return forEntity;
    }


}
