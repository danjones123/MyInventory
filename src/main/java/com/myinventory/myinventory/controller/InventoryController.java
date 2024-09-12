package com.myinventory.myinventory.controller;

import com.myinventory.myinventory.dto.RequestBox;
import com.myinventory.myinventory.dto.ResponseBox;
import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.model.StorageBox;
import com.myinventory.myinventory.service.InventoryService;
import com.myinventory.myinventory.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/inv/v1")
@CrossOrigin
public class InventoryController {

  @Autowired
  InventoryService inventoryService;
  @Autowired
  RoomService roomService;

  /**
   * Returns list of all boxes
   * @return The list of all boxes in the database
   */
  //TODO Updated to be paged
  @GetMapping("/")
  public ResponseEntity<List<ResponseBox>> getAllBoxes() {
    return ResponseEntity.ok(inventoryService.getAllStorageBoxes());
  }


  /**
   * Gets box that has provided name
   * @param name Name of the box to be found
   * @return The box that has the given name
   */
  //TODO Update to give 404 if no box
  @GetMapping("/{name}")
  public ResponseEntity<ResponseBox> getBoxByName(@PathVariable String name) {
    ResponseBox responseBox = inventoryService.getStorageBox(name);

    return ResponseEntity.ok(responseBox);
  }

  @GetMapping("/search")
  public ResponseEntity<List<ResponseBox>> getBoxesBySearch(
      @RequestParam(required = false) String boxName,
      @RequestParam(required = false) String boxDescription,
      @RequestParam(required = false) List<String> boxContents,
      @RequestParam(required = false) String roomName
  ) {
    return ResponseEntity.ok().body(inventoryService.searchBoxes(boxName, boxDescription, boxContents, roomName));
  }

  @GetMapping("/globalSearch")
  public ResponseEntity<List<ResponseBox>> getBoxesBySearch(
      @RequestParam String searchItem,
      @RequestParam(required = false) String roomName
  ) {
    return ResponseEntity.ok().body(inventoryService.globalSearch(searchItem, roomName));
  }




  /**
   * Returns all the rooms in the database
   * @return List of all the rooms
   */
  @GetMapping("/rooms")
  public ResponseEntity<List<Room>> getRooms() {
    return ResponseEntity.ok().body(roomService.findAllRooms());
  }

  /**
   * Adds a new box to the database with the fields provided
   * @param requestBox DTO for transferring to StorageBox object
   * @return 201 if request is correct. 500 error if problem uploading
   */
  //TODO change to be created 201 rather than list
  @PostMapping("/")
  public ResponseEntity<?> addBox(@RequestBody RequestBox requestBox) {
    try {
      inventoryService.addNewStorageBox(requestBox);
      return ResponseEntity.status(201).build();

    } catch (IllegalArgumentException e) {
      return ResponseEntity.internalServerError().body(e.getMessage());
    }
  }

  /**
   * Updates the contents of the box provided
   * @param requestBox Updated contents of the box
   * @return 200 if update successful, otherwise exception
   */
  //TODO Add the box ID as a field to identify box
  @PatchMapping("/")
  public ResponseEntity<?> updateBox(@RequestBody RequestBox requestBox) {
    try {
      return ResponseEntity.ok(inventoryService.updateBoxContents(requestBox));
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error updating box.\n" +  e.getMessage());
    }
  }
}
