package com.myinventory.myinventory.service;

import com.myinventory.myinventory.dto.RequestBox;
import com.myinventory.myinventory.dto.ResponseBox;
import com.myinventory.myinventory.model.StorageBox;

import java.util.List;

public interface InventoryService {

  List<ResponseBox> getAllStorageBoxes();
  ResponseBox getStorageBox(String boxId);
  List<ResponseBox> searchBoxes(String boxName, String boxDescription, List<String> boxContents, String roomName);
  List<ResponseBox> globalSearch(String searchItem, String roomName);
  void addNewStorageBox(RequestBox requestBox) throws IllegalArgumentException;
  StorageBox updateBoxContents(RequestBox requestBox);
}
