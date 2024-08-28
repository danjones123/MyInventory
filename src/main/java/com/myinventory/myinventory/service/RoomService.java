package com.myinventory.myinventory.service;

import com.myinventory.myinventory.model.Room;

import java.util.List;

public interface RoomService {
  Room findOrCreateRoom(String name);
  List<Room> findAllRooms();
}
