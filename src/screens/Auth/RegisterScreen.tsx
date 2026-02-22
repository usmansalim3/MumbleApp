import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {RegisterScreenProps} from '../../navigation/types';

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {register, isRegisterPending, error} = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !name || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await register({username, email, password, name});
      Alert.alert('Success', 'Account created! Please login.');
      navigation.navigate('Login');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && typeof error === 'string' ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      <Button 
        title={isRegisterPending ? 'Registering...' : 'Register'} 
        onPress={handleRegister} 
        disabled={isRegisterPending} 
      />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;
