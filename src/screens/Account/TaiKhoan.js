import React, { useLayoutEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../assets/icons/back.svg";
import HomeIcon from "../../assets/menu_ico/homeon.svg";
import { PRIMARY } from "../../constants/colors";
import { Text } from "@ui-kitten/components";
import { containerStyles } from "../../stylesContainer";
import { COMMON_APP } from "../../constants";
import { timeFormatter } from "../../helper/dateFormat";

export default function TaiKhoanPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={tw.mX4}
            onPress={() => props.navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
        );
      },
      headerTitle: "Cá nhân",
      title: null,
      cardShadowEnabled: false,
    });
  });
  return <></>;
}
