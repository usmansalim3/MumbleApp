import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../../screens/Auth/RegisterScreen";
import LoginScreen from "../../screens/Auth/LoginScreen";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator;