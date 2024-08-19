package com.myinventory.myinventory.dto;

import com.myinventory.myinventory.model.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoxContents {
  private String name;
  private ArrayList<String> boxContents;
  private String room;
}
