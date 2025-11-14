import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { cartStore } from '../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigation/Routes';

const CartBottomBar = () => {
  const totalItems = cartStore(s => s.totalItems());
  const totalPrice = cartStore(s => s.totalPrice());

  const navigation = useNavigation();

  if (totalItems === 0) return 0;

  return (
    <View className="absolute bottom-3 left-0 right-0 flex-row justify-between items-center bg-emerald-500 p-3 rounded-t-3xl shadow-lg shadow-black/10 elevation">
      <Text className="text-white font-medium">
        {totalItems} Items | {totalPrice} EUR
      </Text>
      <Pressable
        onPress={() => navigation.navigate(MainRoutes.Cart)}
        className="bg-white px-4 py-2 rounded-lg"
      >
        <Text className="text-emerald-500 font-bold">View Cart</Text>
      </Pressable>
    </View>
  );
};

export default CartBottomBar;
