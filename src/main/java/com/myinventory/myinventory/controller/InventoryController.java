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
  @GetMapping("/{id}")
  public ResponseEntity<StorageBox> getBoxById(@PathVariable String id) {
    StorageBox storageBox = inventoryService.getStorageBox(id);

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

  @PutMapping("/{id}")
  public ResponseEntity<StorageBox> updateBox(@RequestBody BoxContents boxContents, @PathVariable String id) {
    return null;
  }
}
