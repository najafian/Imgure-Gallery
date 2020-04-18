package com.mobi.lab.demo.service.util;

public enum RestServiceURI {
    ImgurGallery("https://api.imgur.com/3/gallery/");


    private String value;

    RestServiceURI(String value) {
        this.value = value;
    }

    public String getUri() {
        return value;
    }
}
