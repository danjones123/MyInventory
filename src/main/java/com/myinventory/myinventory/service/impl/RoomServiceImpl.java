package com.myinventory.myinventory.service.impl;

import com.myinventory.myinventory.model.Room;
import com.myinventory.myinventory.repository.RoomRepository;
import com.myinventory.myinventory.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
  @Autowired
  RoomRepository roomRepository;

  public Room findOrCreateRoom(String name) {
    Room room = new Room();

    System.out.println("New Room, name = " + name);
    if(name == null || name.equals("") ) {
      name = "The Void";
    }

    room.setRoomName(name);


    if(findRoom(name).isPresent()) {
      return findRoom(name).get();
    } else {
      return roomRepository.save(room);
    }

//    return findRoom(name).orElse(null);


//    return roomRepository.save(room);
  }

  public List<Room> findAllRooms() {
    return roomRepository.findAll();
  }

  public Optional<Room> findRoom(String name) {
    if(roomRepository.findByRoomName(name).isPresent()) {
      return roomRepository.findByRoomName(name);
    } else {
      return roomRepository.findByRoomName(name.toLowerCase());
    }

//    return ;
  }
}
