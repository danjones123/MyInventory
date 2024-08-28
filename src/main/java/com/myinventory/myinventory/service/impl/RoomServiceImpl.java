package com.myinventory.myinventory.service.impl;

import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.repository.RoomRepository;
import com.myinventory.myinventory.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
  @Autowired
  RoomRepository roomRepository;

  public Room findOrCreateRoom(String name) {
    Room room = new Room();
    room.setName(name);
    return findRoom(name).orElse(roomRepository.save(room));


//    return roomRepository.save(room);
  }

  public List<Room> findAllRooms() {
    return roomRepository.findAll();
  }

  public Optional<Room> findRoom(String name) {
    if(roomRepository.findByName(name).isPresent()) {
      return roomRepository.findByName(name);
    } else {
      return roomRepository.findByName(name.toLowerCase());
    }

//    return ;
  }
}
