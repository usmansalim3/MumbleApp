import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {HomeScreenProps} from '../../navigation/types';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {user, logout} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}!</Text>
      <Text style={styles.text}>@{user?.username}</Text>
      <Button title="View Profile" onPress={() => navigation.navigate('Profile', {userId: user?.id})} />
      <Button title="Logout" onPress={logout} />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;
