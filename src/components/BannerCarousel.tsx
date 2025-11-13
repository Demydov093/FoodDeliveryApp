import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';

const BannerCarousel = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 pt-4"
    >
      <View className="mr-3">
        <Image
          source={{
            uri: 'https://cdn.freshtohome.com/media/banner/075c8778cfeed0f6.jpg',
          }}
          className="w-80 h-44 rounded-xl"
          resizeMode="cover"
        />
      </View>
      <View className="mr-3">
        <Image
          source={{
            uri: 'https://cdn.freshtohome.com/media/banner/962d26724e8b1f8f.jpg',
          }}
          className="w-80 h-44 rounded-xl"
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};

export default BannerCarousel;
