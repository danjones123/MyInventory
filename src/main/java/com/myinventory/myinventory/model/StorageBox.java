package com.myinventory.myinventory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("box")
public class StorageBox {
  @Id
  private ObjectId id;

  @Indexed(unique=true)
  private String boxName;

  private String boxDescription;

  private ArrayList<String> boxContents;

  private Room room;

  private Date expiryDate;

  private String externalPhoto;

  private String internalPhoto;
}
