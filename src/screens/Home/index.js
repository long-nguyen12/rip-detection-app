import { Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View
} from "react-native";
import { tw } from "react-native-tailwindcss";
import { containerStyles } from "../../stylesContainer";


import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../constants";
import { HISTORY_PAGE, SCAN_PAGE, SETTING_PAGE, THONGBAO_PAGE } from "../../constants/routes";
import { isEmpty } from "../../epics-reducers/services/common";
import { userDeviceToken } from "../../epics-reducers/services/userServices";

export default function HomePage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    onInit();
  }, []);

  async function onInit() {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    const data = {
      device_token: token,
      user_id: user._id,
    };
    const res = await userDeviceToken(data);
  }

  function checkValidToken(loginRes) {
    if (!isEmpty(loginRes) && loginRes.token !== CONSTANTS.ERROR_AUTHEN) {
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <ImageBackground
        style={[
          tw.flexRow,
          tw.p4,
          {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          },
        ]}
        source={require("../../assets/logo.jpg")}
        resizeMode="contain"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={[tw._m1, tw.p4]}>
          <Text category={"h6"} style={[tw.mB4, containerStyles.textStyle]}>
            Ứng dụng phát hiện dòng chảy xa bờ
          </Text>
          <View style={[tw.flexCol, tw.flexWrap, tw._m1]}>
            <View style={[tw.p1, tw.wFull, { minHeight: 60 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(SCAN_PAGE);
                }}
              >
                {/* <GtUngDungIcon style={tw.mL2} /> */}
                <Text style={[tw.p2, tw.flex1]}>Nhận dạng</Text>
              </TouchableOpacity>
            </View>
            <View style={[tw.p1, tw.wFull, { minHeight: 60 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(HISTORY_PAGE);
                }}
              >
                {/* <GtHuongDanIcon style={tw.mL2} /> */}
                <Text style={[tw.p2, tw.flex1]}>Lịch sử</Text>
              </TouchableOpacity>
            </View>
            <View style={[tw.p1, tw.wFull, { minHeight: 60 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(THONGBAO_PAGE);
                }}
              >
                {/* <GtHuongDanIcon style={tw.mL2} /> */}
                <Text style={[tw.p2, tw.flex1]}>Thông báo</Text>
              </TouchableOpacity>
            </View>
            <View style={[tw.p1, tw.wFull, { minHeight: 60 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(SETTING_PAGE);
                }}
              >
                {/* <GtHuongDanIcon style={tw.mL2} /> */}
                <Text style={[tw.p2, tw.flex1]}>Tài khoản</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
