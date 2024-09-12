package com.myinventory.myinventory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rooms")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Room {

  @Id
  private ObjectId id;
  @Indexed(unique=true)
  private String roomName;
}
