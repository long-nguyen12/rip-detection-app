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

export default function ChiTietThongBao(props) {
  const { data } = props.route.params;
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
      headerTitle: "Thông báo chi tiết",
      //   headerRight: () => {
      //     return (
      //       <TouchableOpacity
      //         style={tw.mX4}
      //         onPress={() => props.navigation.popToTop()}
      //       >
      //         <HomeIcon />
      //       </TouchableOpacity>
      //     );
      //   },
      title: null,
      cardShadowEnabled: false,
      // headerStyle: {
      //   backgroundColor: PRIMARY,
      // },
      // headerTitleStyle: {
      //   color: "white",
      // },
      // headerTitleAlign: "center",
    });
  });

  return (
    <View style={[containerStyles.content, tw.pT4, tw.pX4]}>
      <View>
        <Text style={[tw.fontBold, tw.textJustify]}>
          Phát hiện dòng chảy xa bờ
        </Text>
        <Text style={{ color: "#878787" }}>
          Thời gian nhận dạng: {timeFormatter(data.created_at)}
        </Text>
      </View>
      <Image
        resizeMode="contain"
        source={{
          uri: `${COMMON_APP.HOST_API}/detection/${data.detection_path}`,
        }}
        style={[tw.hFull, tw._mT24]}
      />
    </View>
  );
}
