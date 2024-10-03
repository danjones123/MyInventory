import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput as Input,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

export default function EditableDropdown({
  name,
  value,
  onChangeText,
  dropdownData,
}) {
  const dropdownButtonRef = useRef();

  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [selected, setSelected] = useState(
    value === null ? { label: "", value: "" } : { label: value, value: value }
  );
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (value !== null) {
      onChangeText(value);
      setTextValue(value);
    }
  }, [value]);

  useEffect(() => {
    onChangeText(selected.value);
    setTextValue(selected.value);
  }, [selected]);

  const handleDropdownOpen = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    dropdownButtonRef.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (selectedElement) => {
    if (selected.value !== selectedElement.value) {
      setSelected(selectedElement);
    }
    setVisible(false);
  };

  const renderDropdownElements = (element, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.elementContainer,
        element.value === value && styles.elementSelected,
      ]}
      onPress={() => onItemPress(element)}
    >
      <Text>{element.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
          >
            <ScrollView
              style={[
                styles.dropdown,
                {
                  top: dropdownTop + 15,
                  width: containerWidth,
                  left: horizontalPosition,
                },
              ]}
            >
              {dropdownData?.map((element, idx) =>
                renderDropdownElements(element, idx)
              )}
            </ScrollView>
          </TouchableOpacity>
        </Modal>
      );
    }
  };

  return (
    <View
      style={styles.dropdownView}
      onLayout={({ nativeEvent }) => {
        const { width, x } = nativeEvent.layout;
        setContainerWidth(width);
        setHorizontalPosition(x);
      }}
    >
      {renderDropdown()}
      <View style={styles.inputContainer}>
        <Input
          id={name}
          name={name}
          style={styles.textInput}
          placeholder="Enter Anything"
          placeholderTextColor="#99A3A4"
          selectionColor="#000000"
          value={textValue}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={handleDropdownOpen}
          ref={dropdownButtonRef}
        >
          <Text style={styles.dropdownButtonText}>
            {!visible ? "Open" : "Close"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 50,
    color: "#000000",
    textAlignVertical: "center",
  },
  inputContainer: {
    backgroundColor: "#F8F7F1",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  dropdownButton: {
    backgroundColor: "#000",
    borderRadius: 3,
    padding: 6,
  },
  dropdownButtonText: {
    color: "#FFFFFF",
  },
  dropdownView: {
    width: "100%",
    height: 50,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#F8F7F1",
    height: 160,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  elementContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  elementSelected: {
    backgroundColor: "#7BB6B3",
  },
});
