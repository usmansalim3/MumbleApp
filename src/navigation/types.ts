import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: {
    Login: undefined;
    Register: undefined;
  };
  Home: undefined;
  Profile: {userId?: number};
  ArticleDetail: {articleId: number};
  Articles: undefined;
  Discussions: undefined;
  Messages: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type ArticleDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ArticleDetail'>;
