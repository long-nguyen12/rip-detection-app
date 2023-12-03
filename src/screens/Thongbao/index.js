import { Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { useSelector } from "react-redux";
import WarningIcon from "../../assets/icons/ico_warning.svg";
import LoadingService from "../../components/Loading/LoadingService";
import { API, COMMON_APP } from "../../constants";
import { PRIMARY } from "../../constants/colors";
import { APP_AUTH, LOGIN_PAGE, THONGBAO_CHITIET } from "../../constants/routes";
import { getCanhBao } from "../../epics-reducers/services/canhbaoServices";
import { timeFormatter } from "../../helper/dateFormat";
import { containerStyles } from "../../stylesContainer";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";

import BackIcon from "../../assets/icons/back.svg";

const LOAD_STATUS = {
  NONE: 0,
  IDLE: 1,
  FIRST_LOAD: 2,
  LOAD_MORE: 3,
  PULL_REFRESH: 4,
  ALL_LOADED: 5,
};

let page = 0;

function getPage() {
  return page;
}

function setPage(newPage) {
  page = newPage;
}

export default function ThongbaoPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Thông báo",
      cardShadowEnabled: false,
      // headerStyle: {
      //   backgroundColor: PRIMARY,
      // },
      // headerTitleStyle: {
      //   color: "white",
      // },
      // headerTitleAlign: "center",

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
    });
  });

  const [docs, setDocs] = useState([]);
  const [loadStatus, setLoadStatus] = useState(LOAD_STATUS.NONE);
  let flatList = null;

  useEffect(() => {
    onGetFirstLoad();
  }, []);

  const user = useSelector((state) => state.auth);

  async function onGetRecords() {
    LoadingService.show();
    let canhbao = await getCanhBao(page, 10);
    LoadingService.hide();
    if (canhbao && canhbao.data) {
      return canhbao;
    }
    return null;
  }

  const onGetPullRefresh = async () => {
    setPage(0);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setDocs(data);
  };

  const onGetFirstLoad = async () => {
    setLoadStatus(LOAD_STATUS.FIRST_LOAD);
    setPage(0);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setLoadStatus(LOAD_STATUS.IDLE);
    setDocs(data);
  };

  const onLoadMore = () => {
    if (loadStatus === LOAD_STATUS.IDLE) {
      if (flatList && flatList._listRef._scrollMetrics.offset > 1) {
        onGetLoadMore();
      }
    }
  };

  const onGetLoadMore = async () => {
    setLoadStatus(LOAD_STATUS.LOAD_MORE);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setDocs(data.length && data.length > 0 ? [...docs, ...data] : docs);
    setLoadStatus(data.length > 0 ? LOAD_STATUS.IDLE : LOAD_STATUS.ALL_LOADED);
  };

  const renderSeparator = () => {
    return <View style={[tw.mY3, tw.hPx, tw.bgGray300]} />;
  };

  function renderCanhBao({ item, index }) {
    const img_url = `${COMMON_APP.HOST_API}/detection/${item.detection_path}`;
    return (
      <TouchableOpacity
        style={[tw.pX4]}
        onPress={() => {
          props.navigation.navigate(THONGBAO_CHITIET, {
            data: item,
          });
        }}
        key={index}
      >
        <View style={tw.roundedLg}>
          <ImageBackground
            source={{ uri: img_url }}
            style={[tw.h48, tw.roundedTLg, { overflow: "hidden" }]}
          ></ImageBackground>
        </View>
        <View style={[tw.pX4, tw.pY3]}>
          <View style={[tw.flexRow, tw.alignCenter, tw.mB2]}>
            <Text
              style={[
                tw.fontBold,
                {
                  color: "#1776E8",
                  flex: 1,
                },
              ]}
            >
              Phát hiện dòng chảy xa bờ trong ảnh
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <FlatList
        ref={(c) => (flatList = c)}
        contentContainerStyle={[tw.p4]}
        data={docs}
        renderItem={renderCanhBao}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        // ListEmptyComponent={renderEmpty}
        refreshing={loadStatus === LOAD_STATUS.PULL_REFRESH}
        onRefresh={onGetPullRefresh}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
