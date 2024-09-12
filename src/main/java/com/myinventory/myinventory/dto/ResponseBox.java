package com.myinventory.myinventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseBox {
  private String boxName;
  private String boxDescription;
  private ArrayList<String> boxContents;
  private String roomName;
  private Date expiryDate;
  private String externalPhotoURL;
  private String internalPhotoURL;
}