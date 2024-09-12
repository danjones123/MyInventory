package com.myinventory.myinventory.service.impl;

import com.mongodb.DuplicateKeyException;
import com.myinventory.myinventory.dto.RequestBox;
import com.myinventory.myinventory.dto.ResponseBox;
import com.myinventory.myinventory.mapper.StorageBoxMapper;
import com.myinventory.myinventory.model.StorageBox;
import com.myinventory.myinventory.repository.BoxRepository;
import com.myinventory.myinventory.service.InventoryService;
import com.myinventory.myinventory.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

  @Autowired
  private MongoTemplate mongoTemplate;
  @Autowired
  private BoxRepository boxRepository;
  @Autowired
  private RoomService roomService;
  @Autowired
  private StorageBoxMapper storageBoxMapper;

  @Override
  public List<ResponseBox> getAllStorageBoxes() {
    List<ResponseBox> responseBoxList = new ArrayList<>();
    for(StorageBox storageBox : boxRepository.findAll()) {
      responseBoxList.add(storageBoxMapper.mapStorageBoxToReturn(storageBox));
    }


    return responseBoxList;
  }

  @Override
  public ResponseBox getStorageBox(String boxName) {

    Optional<StorageBox> optBox= boxRepository.findBoxByBoxName(boxName);
    StorageBox storageBox = optBox.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));

    return storageBoxMapper.mapStorageBoxToReturn(storageBox);
  }

  @Override
  public List<ResponseBox> searchBoxes(String boxName, String boxDescription, List<String> boxContents, String roomName) {

    Query query = new Query();

    if (boxName != null && !boxName.isEmpty()) {
        query.addCriteria(Criteria.where("boxName").regex(boxName, "i"));
    }

    if (boxDescription != null && !boxDescription.isEmpty()) {
      query.addCriteria(Criteria.where("boxDescription").regex(boxDescription, "i"));
    }

    if (roomName != null && !roomName.isEmpty()) {
        query.addCriteria(Criteria.where("room.roomName").regex(roomName, "i"));
    }

    if (boxContents != null && !boxContents.isEmpty()) {
      for(String content: boxContents) {
        query.addCriteria(Criteria.where("boxContents").regex(content, "i"));
      }
    }

    List<StorageBox> searchedList = mongoTemplate.find(query, StorageBox.class);
    List<ResponseBox> outputList = new ArrayList<>();
    for(StorageBox storageBox: searchedList) {
      outputList.add(storageBoxMapper.mapStorageBoxToReturn(storageBox));
    }

    return outputList;
  }


  @Override
  public List<ResponseBox> globalSearch(String searchItem, String roomName) {

    Query query = new Query();

    if (searchItem != null && !searchItem.isEmpty()) {
      query.addCriteria(new Criteria().orOperator(
      Criteria.where("boxName").regex(searchItem, "i"),
      Criteria.where("boxDescription").regex(searchItem, "i"),
      Criteria.where("boxContents").regex(searchItem, "i")));
    }


    if (roomName != null && !roomName.isEmpty()) {
      query.addCriteria(Criteria.where("room.roomName").regex(roomName, "i"));
    }

    List<StorageBox> searchedList = mongoTemplate.find(query, StorageBox.class);
    List<ResponseBox> outputList = new ArrayList<>();
    for(StorageBox storageBox: searchedList) {
      outputList.add(storageBoxMapper.mapStorageBoxToReturn(storageBox));
    }

    return outputList;

  }




  @Override
  @Transactional
  public void addNewStorageBox(RequestBox requestBox) throws IllegalArgumentException {
    if(boxRepository.findBoxByBoxName(requestBox.getBoxName()).isPresent()) {
      throw new IllegalArgumentException("A box with that name already exists");
    }

    StorageBox storageBox = storageBoxMapper.mapBoxDtoToEntity(requestBox);

    try {
      boxRepository.save(storageBox);

    } catch (DuplicateKeyException e) {
      throw new IllegalArgumentException("A box with that name already exists");
    }

  }

  @Override
  public StorageBox updateBoxContents(RequestBox requestBox) {

    StorageBox oldBox = boxRepository.findBoxByBoxName(requestBox.getBoxName()).orElseThrow();

    if(requestBox.getBoxContents() != null) {
      oldBox.setBoxContents(requestBox.getBoxContents());
    }
    if(requestBox.getRoomName() != null) {
      oldBox.setRoom(roomService.findOrCreateRoom(requestBox.getRoomName()));
    }
    return boxRepository.save(oldBox);


  }
}
