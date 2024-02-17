import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useSession } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/register';
import Home from './src/home';
import { ClerkProvider, SignedIn, SignedOut,  } from "@clerk/clerk-expo";
import {SignInWithOAuth} from './src/Clogin'
import { PaperProvider } from 'react-native-paper';
import ChatBot from './src/student';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey={"pk_test_b2JsaWdpbmctZmxhbWluZ28tOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <PaperProvider>
    <SignedOut> 
    <NavigationContainer > 
        
        <Stack.Navigator initialRouteName="Clogin">
        <Stack.Screen name = "clogin" component ={SignInWithOAuth} options={{title: "Welcome To Learnhub", animation: 'slide_from_right', animationDuration: '550' }} />

        </Stack.Navigator>
        </NavigationContainer>
    </SignedOut>
    <SignedIn>
    <NavigationContainer >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name = "Home" component={Home} options={{title: "EDU", animation: 'slide_from_right', animationDuration: '550' }} />
    </Stack.Navigator>
    </NavigationContainer>
    </SignedIn>
    </PaperProvider>
    </ClerkProvider>
    
  );
}
// export function signOutUser() {
//   const { signOut } = useSession();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   // Call this function wherever you need to sign the user out
//   return handleSignOut;
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
