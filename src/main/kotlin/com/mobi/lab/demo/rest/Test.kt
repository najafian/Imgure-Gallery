package com.mobi.lab.demo.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/api/test")
class Test {
    @GetMapping
    fun test(): String {
        return ""
    }
}
