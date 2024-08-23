package com.myinventory.myinventory.service;

import com.myinventory.myinventory.model.Room;

public interface RoomService {
  public Room findOrCreateRoom(String name);
}
