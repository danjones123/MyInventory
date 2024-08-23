package com.myinventory.myinventory.service.impl;

import com.mongodb.DuplicateKeyException;
import com.mongodb.MongoWriteException;
import com.myinventory.myinventory.dto.BoxContents;
import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.model.StorageBox;
import com.myinventory.myinventory.repository.BoxRepository;
import com.myinventory.myinventory.service.InventoryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

  @Autowired
  BoxRepository boxRepository;
  @Autowired
  RoomServiceImpl roomService;


  @Override
  public List<StorageBox> getAllStorageBoxes() {

    return boxRepository.findAll();
  }

  @Override
  public StorageBox getStorageBox(String boxName) {

    Optional<StorageBox> optBox= boxRepository.findBoxByName(boxName);

    return optBox.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));
  }

  @Override
  @Transactional
  public List<StorageBox> addNewStorageBox(BoxContents boxContents) throws IllegalArgumentException {
    StorageBox storageBox = new StorageBox();
    storageBox.setBoxContents(new ArrayList<>(boxContents.getBoxContents()));
    storageBox.setName(boxContents.getName());

    if(boxRepository.findBoxByName(boxContents.getName()).isPresent()) {
      throw new IllegalArgumentException("A box with that name already exists");
    }

//    Optional<Room> optRoom = roomService.findRoom(boxContents.getRoom());
    Room room = roomService.findOrCreateRoom(boxContents.getRoom());
    storageBox.setRoom(room);

    try {
      boxRepository.save(storageBox);
      return getAllStorageBoxes();
    } catch (DuplicateKeyException e) {
      throw new IllegalArgumentException("A box with that name already exists");
    }

  }

  @Override
  public StorageBox updateBoxContents(BoxContents boxContents) {

    StorageBox oldBox = boxRepository.findBoxByName(boxContents.getName()).orElseThrow();

    if(boxContents.getBoxContents() != null) {
      oldBox.setBoxContents(boxContents.getBoxContents());
    }
    if(boxContents.getRoom() != null) {
      oldBox.setRoom(roomService.findOrCreateRoom(boxContents.getRoom()));
    }
    return boxRepository.save(oldBox);


  }
}
