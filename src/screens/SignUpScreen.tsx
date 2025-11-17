import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { AuthRoutes, AuthStackParamList } from '../navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { signUp } from '../api/apiClient';
import { authStore } from '../store/userStore';

type FormData = { email: string; password: string; phone: string };

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '', phone: '' },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const { setAuth } = authStore();

  const onSubmit = async (data: FormData) => {
    console.log('Submitting signup', data);
    try {
      const { user, token } = await signUp(data);
      console.log('Signup success', user, token);
      setAuth(user, token);
    } catch (error) {
      console.error('Signup error', error);
      Alert.alert('Error', error?.response?.data?.error || 'Sigup failed');
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 16 }}
    >
      <Text className="text-2xl font-bold text-center text-green-600">
        Sign Up
      </Text>

      <Text className="text-sm font-medium mt-6">Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
        }}
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
      {errors?.email && (
        <Text className="text-red-500">{errors?.email?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Min 6 characters',
          },
        }}
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
      {errors?.password && (
        <Text className="text-red-500">{errors?.password?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        rules={{
          required: 'Phone is required',
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter phone number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            className="border-b border-gray-300 py-2"
          />
        )}
      />
      {errors?.phone && (
        <Text className="text-red-500">{errors?.phone?.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-3 rounded-full mt-6"
      >
        <Text className="text-white text-center font-bold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(AuthRoutes.Login)}
        className="mt-6"
      >
        <Text className="text-center text-blue-600">
          Have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;
