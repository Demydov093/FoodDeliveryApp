import {
  View,
  Text,
  FlatList,
  TextComponent,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../navigation/Routes';
import { CartItem, cartStore } from '../store/cartStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const addItem = cartStore(s => s.addItem);
  const updateQuantity = cartStore(s => s.updateQuantity);
  const removeItem = cartStore(s => s.removeItem);

  const items = cartStore(s => s.items);
  const totalItems = items?.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0,
  );
  const totalPrice = items?.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 0) || 0),
    0,
  );
  const handleIncrement = ({ item }) => updateQuantity(item.id, 1);
  const handleDecrement = ({ item }) => updateQuantity(item.id, -1);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="bg-white rounded-xl p-4 mb-4 flex-row shadow-xl">
      <View className="flex-1 pr-3">
        <Text className="text-base font-semibold">{item.name}</Text>
        <Text className="text-lg font-extrabold mt-1">
          {item?.price * (item.quantity || 1)} EUR
        </Text>
        <Text className="text-sm text-gray-500">1 Pack</Text>

        <View className="flex-row items-center mt-2 gap-2">
          <Ionicons name="bicycle" size={16} color="#6B7280" />
          <Text>Today in 15 minutes</Text>
        </View>

        <Pressable
          onPress={() => removeItem(item?.id)}
          className="flex-row items-center mt-2 gap-2"
        >
          <Ionicons name="trash-outline" size={16} color="#6B7280" />
          <Text className="text-sm text-gray-500">Remove</Text>
        </Pressable>
      </View>

      <View className="items-center w-28">
        <Image
          source={{ uri: item?.imageUrl }}
          className="w-24 h-24 rounded-lg mb-3"
        />
        <View className="w-24 h-9 px-2 py-1 rounded-full border border-emerald-100 flex-row items-center justify-center gap-2">
          <Pressable
            onPress={() => handleDecrement({ item })}
            hitSlop={8}
            className="min-w-7 items-center"
          >
            <Text className="text-lg font-black text-emerald-600">-</Text>
          </Pressable>
          <Text className="text-lg font-extrabold text-emerald-700">
            {item?.quantity}
          </Text>
          <Pressable
            onPress={() => handleIncrement({ item })}
            hitSlop={8}
            className="min-w-7 items-center"
          >
            <Text className="text-lg font-black text-emerald-600">+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4">Your Cart</Text>
      <View className="bg-purple-50 border border-purple-300 border-dashed rounded-lg mx-4 p-3 mb-5">
        <Text>Get some discount | Use code: 784E</Text>
      </View>
      <FlatList
        data={items ?? []}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        className="px-4"
      />
      {totalItems > 0 && (
        <View className="absolute bottom-6 left-4 right-4 bg-green-600 flex-row justify-between items-center px-4 py-3 rounded-xl shadow-lg">
          <Text className="text-white text-base font-semibold">
            {totalItems} items | {totalPrice}
          </Text>
          <Pressable
            onPress={() => navigation.navigate(MainRoutes.Checkout)}
            className="bg-white px-4 py-2 rounded-lg"
          >
            <Text>Procced</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
