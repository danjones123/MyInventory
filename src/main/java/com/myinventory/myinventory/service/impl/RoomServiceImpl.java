package com.myinventory.myinventory.service.impl;

import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl {
  @Autowired
  RoomRepository roomRepository;

  public Room findOrCreateRoom(String name) {
    Room room = new Room();
    room.setName(name);
    return findRoom(name).orElse(roomRepository.save(room));


//    return roomRepository.save(room);
  }

  public List<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Optional<Room> findRoom(String name) {
    return roomRepository.findByName(name);
  }
}
