package com.myinventory.myinventory.repository;

import com.myinventory.myinventory.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room, String> {
  Optional<Room> findByName(String name);
}
