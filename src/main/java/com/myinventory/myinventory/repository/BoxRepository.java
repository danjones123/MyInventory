package com.myinventory.myinventory.repository;

import com.myinventory.myinventory.model.StorageBox;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BoxRepository extends MongoRepository<StorageBox, ObjectId> {
  @Query("name : '?0'")
  StorageBox findBoxByName(String name);

}
