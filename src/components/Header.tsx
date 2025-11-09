import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/Routes';
import Ionicons from '@react-native-vector-icons/ionicons';

const Header = () => {
  const nav = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <View className="px-4 pb-4 rounded-b-2x">
      <Text className="text-white text-sm">Delivery starting in</Text>
      <View className="flex-row items-end justify-between mt-1">
        <View>
          <Text className="text-white text-3xl font-extrabold">
            15 minutes ⚡⚡⚡
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-white font-medium">111111 - Krakow</Text>
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color={'#fff'}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginLeft: 6 }}
            />
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Pressable>
            <Ionicons
              name="heart-outline"
              size={22}
              color={'#fff'}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginLeft: 6 }}
            />
          </Pressable>

          <Pressable>
            <Ionicons
              name="person-outline"
              size={22}
              color={'#fff'}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Header;
