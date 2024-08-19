package com.myinventory.myinventory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("box")
public class StorageBox {
  @Id
  private ObjectId id;

  @Indexed(unique=true)
  private String name;

  private ArrayList<String> boxContents;

  private Room room;
}
