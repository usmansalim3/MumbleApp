import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {LoginScreenProps} from '../../navigation/types';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {login, isLoginPending, error} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
console.log('LoginScreen render', { username, password, isLoginPending, error });
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await login({username, password});
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mumble</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
        title={isLoginPending ? 'Logging in...' : 'Login'} 
        onPress={handleLogin} 
        disabled={isLoginPending} 
      />
      <Button
        title="Don't have an account? Register"
        onPress={() => navigation.navigate('Register')}
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

export default LoginScreen;
