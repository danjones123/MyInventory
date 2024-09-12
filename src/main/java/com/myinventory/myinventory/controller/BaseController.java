package com.myinventory.myinventory.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
  public class BaseController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<String> handleRoot() {
      return ResponseEntity.ok("Service is running");
  }
}
