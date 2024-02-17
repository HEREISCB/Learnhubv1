import React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import {
  useOAuth,
  useSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import { customstyles } from "../style";
import { FullWindowOverlay } from "react-native-screens";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function checkkeyboard() {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardStatus("Keyboard Shown");
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardStatus("Keyboard Hidden");
  });
  if (keyboardStatus == "Keyboard Shown") {
  } else {
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "monospace",
            marginBottom: 10,
            width: 390,
            marginTop: 5,
            textAlign: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          Welcome to Learnhub! Elevate your study game with AI-powered
          learning. 🚀 Your path to success begins here!
        </Text>
      </View>
    );
  }
}

WebBrowser.maybeCompleteAuthSession();

export function SignInWithOAuth() {
  const [checkbox, setcheckbox] = useState(false);

  function iffacylty() {
    if (checkbox == true) {
      return <Text>Yes faculty</Text>;
    }
  }

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SignedOut>
        <View>
          <Image
            style={{
              width: FullWindowOverlay.width,
              height: 300,
              top: -18,
              marginBottom: 20,
            }}
            source={require("../assets/Ai_teaching.png")}
          />
        </View>

        <SafeAreaView style={customstyles.container}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              marginBottom: 10,
              width: 200,
              textAlign: "center",
            }}
          >
            Using ID The and Password Provided By Your Faculty
          </Text>
          <View>
            <TextInput
              style={customstyles.textbox}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </View>
          <View>
            <TextInput
              style={customstyles.textbox}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <BouncyCheckbox
            text="Faculty?"
            textStyle={{
              textDecorationLine: "none", margin: 10
            }}
            onPress={() => setcheckbox(!checkbox)}
          />
          {iffacylty()}

          <TouchableOpacity
            style={[
              styles.signInButton,
              { width: customstyles.textbox.width },
            ]}
            onPress={onSignInPress}
          >
            <Image
              style={styles.logo}
              source={require("../assets/logo.png")}
            />
            <Text style={styles.signInButtonText}>Sign in with Email</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <TouchableOpacity
              style={[
                styles.googleSignInButton,
                { width: customstyles.textbox.width },
              ]}
              onPress={onPress}
            >
              <Image
                style={styles.googleLogo}
                source={require("../assets/googlelogo.png")}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {checkkeyboard()}
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
  },

  googleSignInButton: {
    backgroundColor: "black",
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logo: {
    width: 20, // Adjust the width of the Learnhub logo as needed
    height: 20, // Adjust the height of the Learnhub logo as needed
    marginRight: 10,
    paddingRight: 12,
    tintColor: 'white', 
    
  },
});
