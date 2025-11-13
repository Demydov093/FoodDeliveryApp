import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousel from '../components/BannerCarousel';
import { products } from '../utils/productsData';

import { useQuery } from '@tanstack/react-query';
import { Category, fetchCategories } from '../api/apiClient';
import CategoryCard from '../components/CategoryCard';

function CategorySkeletonRow() {
  const placeholders = Array.from({ length: 8 }, (_, i) => i.toString());

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-1"
      >
        {placeholders?.map(item => (
          <View key={item} className="mr-4 w-20 items-center">
            <View className="h-16 w-16 rounded-full bg-zinc-200 animate-pulse" />
            <View className="h-3 w-14 rounded bg-zinc-200 animate-pulse mt-2" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const HomeScreen = () => {
  const [query, setQuery] = useState('');

  const { data: categories, isLoading } = useQuery<Category>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-green-700">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#15803d"
        translucent={false}
      />
      <View className="bg-green-700">
        <Header />
        <View className="px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />
        </View>
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-3xl">
        <View className="pb-10">
          <View className="pt-4">
            <BannerCarousel />
          </View>

          {/* Categories */}

          <View className="px-4 mt-4">
            <Text className="text-xl font-bold">What we have</Text>
            {isLoading ? (
              <CategorySkeletonRow />
            ) : (
              <FlatList
                data={categories ?? []}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                className="mt-4"
                renderItem={({ item }) => (
                  <CategoryCard name={item?.name} imageUrl={item?.imageUrl} />
                )}
              />
            )}
          </View>

          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Flash sale</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Specials</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 pt-4"
          >
            {products?.map((p: any, index: number) => (
              <View
                key={index}
                className="mr-4 rounded-2xl bg-white shadow-md w-56 overflow-hidden"
              >
                <View className="h-40 w-full">
                  <Image
                    source={{ uri: p.imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                <View className="p-3">
                  <Text
                    className="text-lg font-semibold text-gray-800"
                    numberOfLines={1}
                  >
                    {p.name}
                  </Text>
                  <Text className="text-base font-medium text-green-600 mt-1">
                    ${p.price}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
