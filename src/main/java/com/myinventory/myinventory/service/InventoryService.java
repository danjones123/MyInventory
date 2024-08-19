package com.myinventory.myinventory.service;

import com.myinventory.myinventory.dto.BoxContents;
import com.myinventory.myinventory.model.StorageBox;

import java.util.List;

public interface InventoryService {

  List<StorageBox> getAllStorageBoxes();
  StorageBox getStorageBox(String boxId);
  List<StorageBox> addNewStorageBox(BoxContents boxContents) throws IllegalArgumentException;
  StorageBox updateBoxContents(BoxContents boxContents);
}
