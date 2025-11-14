import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRoutes, AuthStackParamList } from '../navigation/Routes';

type FormData = { email: string; password: string };

const LoginScreen = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View className="flex-1 bg-white p-4 justify-center">
      <Text className="text-2xl font-bold text-center text-green-600">
        Get Started
      </Text>
      <Text className="text-center text-gray-600 mt-2">
        Register to get some food
      </Text>

      <Text className="text-sm font-medium mt-6">Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            className="border-b border-gray-300 py-2"
          />
        )}
      />

      <Text className="text-sm font-medium mt-6">Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter password"
            secureTextEntry
            className="border-b border-gray-300 py-2"
          />
        )}
      />

      <TouchableOpacity className="bg-green-600 p-3 rounded-full mt-6">
        <Text className="text-white text-center font-bold">CONTINUE</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white border border-gray-300 p-3 rounded-full mt-4 flex-row justify-center items-center gap-3">
        <Image
          source={{
            uri: 'https://waryhub.com/files/preview/960x960/11751081496gpuepp6lcw9xkkrbtshob8c2239rlbxht77gj4stbzedm9jhnvmdmvcn2f5bdrnr9m6rbea0cnmzgdgrpqpvibhl2dtfbkovkqk9.png',
          }}
          className="w-8 h-8"
        />
        <Text className="text-gray-800 font-bold">Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(AuthRoutes.SignUp)}
        className="mt-6"
      >
        <Text className="text-center text-blue-600">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
