package com.myinventory.myinventory.controller;

import com.myinventory.myinventory.dto.BoxContents;
import com.myinventory.myinventory.model.StorageBox;
import com.myinventory.myinventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/inv/v1")
public class InventoryController {

  @Autowired
  InventoryService inventoryService;

  @GetMapping("/")
  public ResponseEntity<List<StorageBox>> getAllBoxes() {
    return ResponseEntity.ok(inventoryService.getAllStorageBoxes());
  }


  //TODO update to find by name
  @GetMapping("/{name}")
  public ResponseEntity<StorageBox> getBoxByName(@PathVariable String name) {
    StorageBox storageBox = inventoryService.getStorageBox(name);

    return ResponseEntity.ok(storageBox);
  }


  @PostMapping("/")
  public ResponseEntity<?> addBox(@RequestBody BoxContents boxContents) {
    try {
      return ResponseEntity.ok(inventoryService.addNewStorageBox(boxContents));

    } catch (IllegalArgumentException e) {
      return ResponseEntity.internalServerError().body(e.getMessage());
    }
  }

  @PatchMapping("/")
  public ResponseEntity<?> updateBox(@RequestBody BoxContents boxContents) {
    try {
      return ResponseEntity.ok(inventoryService.updateBoxContents(boxContents));
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error updating box.\n" +  e.getMessage());
    }
  }
}
