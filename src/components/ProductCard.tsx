import {
  View,
  Text,
  Dimensions,
  Animated,
  Pressable,
  Image,
} from 'react-native';
import React, { memo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const GAP = 16;
const PRODUCT_CARD_WIDTH = (screenWidth - GAP * 3) / 2;

type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  unit?: string;
  etaText?: string;
  mrp?: number;
};

type Props = { item: Product };

function ProductCardBase({ item }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 6,
    }).start();
  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  const displayUnit = '1 pack';

  return (
    <Animated.View
      style={{ transform: [{ scale }], width: PRODUCT_CARD_WIDTH }}
    >
      <Pressable
        className="mb-4 rounded-2xl overflow-hidden bg-white shadow-md android:elevation-2"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => {}}
      >
        <View className="h-36 bg-gray-800 dark:bg-zinc-900 relative rounded-2xl overflow-hidden">
          <Image
            source={{ uri: item?.imageUrl }}
            resizeMode="cover"
            className="w-full h-full"
          />
          <View className="absolute left-2 bottom-2 px-2 py-1 rounded-xl border border-gray-200 bg-white">
            <Text
              numberOfLines={1}
              className="text-[11px] font-semibold text-gray-600"
            >
              {displayUnit}
            </Text>
          </View>
          <Pressable
            onPress={() => {}}
            hitSlop={10}
            className="absolute right-2 top-2 px-2 py-1 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <Text className="text-sm">♡</Text>
          </Pressable>
        </View>

        <View className="px-4 py-3">
          <View className="h-10">
            <Text
              className="font-semibold text-sm leading-5 text-slate-900"
              numberOfLines={1}
            >
              {item?.name}
            </Text>
          </View>

          <View className="mt-1 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-medium font-extrabold text-slate-900 dark:text-zinc-100">
                {Number(item.price).toFixed(0)} EUR
              </Text>
            </View>
          </View>
        </View>
        <View className="border-t border-gray-200 items-center justify-center bg-violet-50 py-2">
          <Text className="text-sm font-bold tracking-tight text-violet-800">
            ⚡️ GET IN 15 min
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default memo(ProductCardBase);
