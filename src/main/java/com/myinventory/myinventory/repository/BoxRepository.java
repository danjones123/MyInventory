package com.myinventory.myinventory.repository;

import com.myinventory.myinventory.model.StorageBox;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BoxRepository extends MongoRepository<StorageBox, ObjectId> {
//  @Query("name : '?0'")
  Optional<StorageBox> findBoxByName(String name);

}
