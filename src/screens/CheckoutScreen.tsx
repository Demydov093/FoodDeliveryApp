import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Touchable,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartStore } from '../store/cartStore';
import { authStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import { addressStore } from '../store/addressStore';
import Ionicons from '@react-native-vector-icons/ionicons';

const SlotChip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className={`px-3 py-2 mr-2 rounded-lg border ${
      selected ? 'bg-green-600 border-green-600' : 'bg-white border-gray-200'
    }`}
    android_ripple={{ color: '#16A34A20' }}
  >
    <Text
      className={`${selected ? 'text-white' : 'text-gray-800'} font-medium`}
    >
      {label}
    </Text>
  </Pressable>
);

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { items: cartItems, clearCart } = cartStore();
  const { user } = authStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('ASAP');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'ONLINE'>(
    'ONLINE',
  );
  const [isProcessing, setIsProvcessing] = useState(false);

  const { addresses, selectedAddressId, selectAddress, removeAddress } =
    addressStore();

  const selectedAddress = useMemo(() => {
    if (!addresses || addresses.length === 0) return null;
    return addresses.find(a => a.id === selectedAddressId) || addresses[0];
  }, [addresses, selectedAddressId]);

  const slotOptions = [
    'ASAP',
    'Today 6-8 PM',
    'Tomorrow 9-11 AM',
    'Tomorrow 6-8 PM',
  ];

  const cartTotalItems = cartItems?.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const cartTotalPrice = cartItems?.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0,
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View>
        <Text className="text-xl font-extrabold text-center">Checkout</Text>
      </View>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Deliver to
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow-2xl">
          <View className="flex-row items-start gap-3">
            <View className="w-12 h-12 rounded-md bg-green-50 justify-center items-center">
              <Ionicons name="home-outline" size={22} color={'#16A34A'} />
            </View>

            <View className="flex-1">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-base font-bold">
                    {selectedAddress?.type}
                  </Text>
                  <Text className="text-gray-700 font-medium mt-1">
                    {selectedAddress?.name} {selectedAddress?.flatNo}
                  </Text>
                </View>

                <Pressable className="px-2 py-1">
                  <Text className="text-purple-600 font-semibold">Change</Text>
                </Pressable>
              </View>

              <Text className="text-gray-500">{selectedAddress?.locality}</Text>

              <View className="mt-3 flex-row items-center">
                <Ionicons name="star" size={14} color="#f59E0B" />
                <Text className="text-sm text-gray-500 ml-2">
                  Preffered delivery address
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Delivery Slot
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow-2xl">
          <Text className="tex-sm text-gray-500 mb-3">
            When you want your order?
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {slotOptions.map(s => (
              <SlotChip
                key={s}
                label={s}
                selected={deliverySlot === s}
                onPress={() => setDeliverySlot(s)}
              />
            ))}
          </ScrollView>

          <View className="mt-4">
            <Text className="text-sm text-gray-500 mb-2">
              Do you have some notes? (Optional)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Leave a note"
              className="bg-gray-100 rounded-lg px-3 py-2 text-sm"
            />
          </View>
        </View>

        <Text className="mt-6 mb-3 text-gray-700 font-semibold ">
          Payment method
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow-xl">
          <TouchableOpacity className="flex-row items-center mb-4">
            <View
              className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'ONLINE' ? 'border-green-600 bg-green-600' : 'border-gray-400'}`}
            />
            <Text className="ml-3 text-gray-800">Pay Online (Pazorpay)</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <View
              className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'CASH' ? 'border-green-600 bg-green-600' : 'border-gray-400'}`}
            />
            <Text className="ml-3 text-gray-800">Cash on delivery</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-700 font-semibold mt-6 mb-3">
          Order Summary
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow-xl">
          {cartItems.length === 0 ? (
            <View>No items</View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex-row items-center py-3 border-b border-gray-100">
                    <Image
                      source={{ uri: item?.imageUrl }}
                      className="w-16 h-16 rounded-md mr-3"
                    />
                    <View className="flex-1">
                      <Text className="font-semibold" numberOfLines={2}>
                        {item?.name}
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        {item.quantity} x {item.price} EUR
                      </Text>
                    </View>
                    <Text className="font-semibold">
                      {(item.price * (item.quantity || 1)).toFixed(0)} EUR
                    </Text>
                  </View>
                )}
              />
              <View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Sub Total</Text>
                  <Text className="font-semibold">
                    {cartTotalPrice.toFixed(0)} EUR
                  </Text>
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-gray-600">Delivery fee</Text>
                  <Text className="font-semibold">Free</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-gray-800 font-extrabold">
                    Total price
                  </Text>
                  <Text className="font-semibold">
                    {cartTotalPrice.toFixed(0)} EUR
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-4 right-4 ">
        <Pressable
          onPress={() => {}}
          className={`bg-green-600 flex-row justify-between items-center px-5 py-4 rounded-xl shadow-lg ${isProcessing ? 'opacity-50' : ''}`}
        >
          <View>
            <Text className="text-white font-semibold">Payment</Text>
            <Text className="text-white text-sm opacity-90">
              {cartTotalItems} item{cartTotalItems !== 1 ? 's' : ''} -{' '}
              {cartTotalPrice.toFixed(0)} EUR
            </Text>
          </View>
          <View className="bg-white px-4 py-2 rounded-xl">
            <Text>{isProcessing ? 'Processing' : 'Continue'}</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
