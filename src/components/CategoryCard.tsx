import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

export default function CategoryCard({
  name,
  imageUrl,
  onPress,
}: {
  name: string;
  imageUrl?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="mr-3">
      <View className="bg-[#F3E8FF] w-28 h-28 rounded-2xl items-center justify-center p-2 shadow-xl">
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-center text-sm font-semibold mt-2 w-28">
        {name}
      </Text>
    </Pressable>
  );
}
