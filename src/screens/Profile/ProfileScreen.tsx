import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {ProfileScreenProps} from '../../navigation/types';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {user, logout} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Name: {user?.name}</Text>
      <Text style={styles.text}>Username: @{user?.username}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
