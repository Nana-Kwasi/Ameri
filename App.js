import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import LoginScreen from './src/Screens/Login/Logins';
import Home from './src/Screens/Home/Home'
import BottomTabNavigator from './src/Screens/BottomTab/BottomTapNavigator';
import WelcomeScreen from './src/Screens/Communication/Welcome';
import WishlistScreen from './src/Screens/Health/Wishlist';
import EducationScreen from './src/Screens/Education/Profile';
import TrackingScreen from './src/Screens/Tracking/Tracking';
// import TeacherScreen from './src/Screens/Teacher/Teacher';
// import ParentScreen from './src/Screens/Parent/Parent';
import CheckoutScreen from './src/Screens/Checkout/Checkout';
import FoodScreen from './src/Screens/Food/Food';
// import MyWeekScreen from './src/Screens/MyWeek/MyWeek';
// import MemoriesScreen from './src/Screens/Memories/Memories';
import Stores from './src/Screens/Stores/Store';
import CartScreen from './src/Screens/Cart/Cart';
import PaymentScreen from './src/Screens/Payment/Payment';
import store from './src/Screens/Store/Store';
import ChooseScreen from './src/Screens/Choose/Choose';
import SignUpScreen from './src/Screens/Sign/SignUP';






const Stack = createStackNavigator();

export default function App() {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="BottomTapNavigator" component={BottomTabNavigator} /> 
          <Stack.Screen name="Welcome"  options={{ headerShown: false }}  component={WelcomeScreen} /> 
          <Stack.Screen name="Tracking" options={{ headerShown: false }} component={TrackingScreen} /> 
          <Stack.Screen name="Education" component={EducationScreen} /> 
          <Stack.Screen name="Wishlist" options={{ headerShown: false }} component={WishlistScreen} /> 
          {/* <Stack.Screen name="Teacher" component={TeacherScreen} />  */}
          {/* <Stack.Screen name="Parent" options={{ headerShown: false }} component={ParentScreen} />  */}
          <Stack.Screen name="Food" options={{ headerShown: false }} component={FoodScreen} /> 
          {/* <Stack.Screen name="MyWeek" options={{ headerShown: false }} component={MyWeekScreen} />  */}
          {/* <Stack.Screen name="Memories" options={{ headerShown: false }} component={MemoriesScreen} />  */}
          <Stack.Screen name="Stores" options={{ headerShown: false }} component={Stores} /> 
          <Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} /> 
          <Stack.Screen name="Checkout" options={{ headerShown: false }} component={CheckoutScreen} /> 
          <Stack.Screen name="Payment" options={{ headerShown: false }} component={PaymentScreen} />
          <Stack.Screen name="Choose" options={{ headerShown: false }} component={ChooseScreen} />
          <Stack.Screen name="SignUP" options={{ headerShown: false }} component={SignUpScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
  
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
          </Provider>
  
    );
  }
  




