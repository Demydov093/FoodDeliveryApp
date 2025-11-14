import {
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProductCard from '../components/ProductCard';
import CartBottomBar from '../components/CartBottomBar';

type Route = RouteProp<{ params: { categoryName?: string } }, 'params'>;

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<Route>();

  const initCategoryName = route?.params?.categoryName;

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    initCategoryName || categories?.[0]?.name,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCategory = categories?.find(
    (c: any) => c.name === selectedCategoryName,
  );

  const products = selectedCategory?.products || [];
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
      <View className="px-4 pt-3 pb-2 bg-white">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <Pressable className="p-2" onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#000" />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(prev => !prev)}
              className="flex-row items-center gap-2"
            >
              <Text>{selectedCategoryName}</Text>
              <Ionicons name="chevron-down-outline" size={18} color="#000" />
            </Pressable>
          </View>
          <Pressable>
            <Ionicons name="search-outline" size={22} color="#000" />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 px-4 mt-4">
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard item={item} />}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center">
              No products in this category
            </Text>
          }
        />
      </View>

      <CartBottomBar />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-center p-6">
          <View className="bg-white rounded-2xl max-h-[70%] p-4">
            <Text className="text-lg font-bold mb-3 text-center">
              Categories
            </Text>
            <ScrollView>
              {categories?.map((cat: any) => (
                <Pressable
                  key={cat.id}
                  onPress={() => {
                    setSelectedCategoryName(cat.name);
                    setModalVisible(prev => !prev);
                  }}
                  className={`py-2 mb-2 p-2 ${selectedCategoryName === cat.name ? 'bg-slate-300' : 'bg-slate-200'}`}
                >
                  <Text
                    className={`text-base text-center ${selectedCategoryName === cat.name ? 'font-bold' : 'font-normal'}`}
                  >
                    {cat?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              className="bg-red-100 rounded-2xl mt-3"
              onPress={() => setModalVisible(prev => !prev)}
            >
              <Text className="text-red-500 text-center p-4">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CategoryScreen;
