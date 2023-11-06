package com.back.salcho.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/api/hello")
    public String helloText(){
        return "Hello World";
    }
}
