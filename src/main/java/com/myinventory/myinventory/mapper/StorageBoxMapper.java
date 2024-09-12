package com.myinventory.myinventory.mapper;

import com.myinventory.myinventory.dto.RequestBox;
import com.myinventory.myinventory.dto.ResponseBox;
import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.model.StorageBox;
import com.myinventory.myinventory.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StorageBoxMapper {
  @Autowired
  RoomService roomService;

  public StorageBox mapBoxDtoToEntity(RequestBox requestBox) {
    StorageBox storageBox = new StorageBox();
    storageBox.setBoxName(requestBox.getBoxName());
    storageBox.setBoxDescription(requestBox.getBoxDescription());
    storageBox.setBoxContents(requestBox.getBoxContents());

    Room room = roomService.findOrCreateRoom(requestBox.getRoomName());
    storageBox.setRoom(room);

    storageBox.setExpiryDate(requestBox.getExpiryDate());
    storageBox.setExternalPhoto(requestBox.getExternalPhotoURL());
    storageBox.setInternalPhoto(requestBox.getInternalPhotoURL());

    return storageBox;
  }

  public ResponseBox mapStorageBoxToReturn(StorageBox storageBox) {
    ResponseBox responseBox = new ResponseBox();
    responseBox.setBoxName(storageBox.getBoxName());
    responseBox.setBoxDescription(storageBox.getBoxDescription());
    responseBox.setBoxContents(storageBox.getBoxContents());
    responseBox.setRoomName(storageBox.getRoom().getRoomName());
    responseBox.setExpiryDate(storageBox.getExpiryDate());
    responseBox.setExternalPhotoURL(storageBox.getExternalPhoto());
    responseBox.setInternalPhotoURL(storageBox.getInternalPhoto());


    return responseBox;
  }
}
