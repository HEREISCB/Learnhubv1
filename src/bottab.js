import React from "react";
import { View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Upload from "./tempUpload";
import ChatBot from "./student";
import Homec from "./Homec";
import Account from "./Account";

const Bottabs = createBottomTabNavigator();

const CommonTab = ({ label, icon, focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Image
      style={{
        width: focused ? 60 : 40,
        height: focused ? 60 : 40,
        marginBottom: 5,
      }}
      source={icon}
    />
    <Text
      style={{
        color: focused ? "blue" : "black",
        fontSize: 14,
        paddingTop: 5, // Add top padding
      }}
    >
      {label}
    </Text>
  </View>
);
const HomeTab = ({ focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Image
      style={{
        width: focused ? 60 : 40,
        height: focused ? 60 : 40,
        marginBottom: 5,
        // Add any specific styles for the HOME tab
        // For example, you can add a border to the focused state
        
        borderWidth: focused ? 2 : 0,
        borderRadius: 10,
      }}
      source={require("../assets/home.png")}
    />
    <Text
      style={{
        color: focused ? "blue" : "black",
        fontSize: 14,
        paddingTop: 5,
      }}
    >
      
    </Text>
  </View>
);

const Bottab = () => {
  return (
    <Bottabs.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          elevation: 2,
          bottom: 15,
          borderRadius: 55,
          marginHorizontal: 12,
          height: 60,
          paddingBottom: 0,
          padding: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarItemStyle: {
          width: 100, 
        },
        headerShown: false,
      }}
    >
     <Bottabs.Screen
        name="HOME"
        component={Homec}
        options={{
          tabBarIcon: ({ focused }) => <HomeTab focused={focused} />,
          tabBarLabel: "HOME",
        }}
      />

      <Bottabs.Screen
        name="Upload Notes"
        component={Upload}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTab
              
              icon={require("../assets/upload.png")}
              focused={focused}
            />
          ),
          tabBarLabel: "Upload Notes",
        }}
      />

      <Bottabs.Screen
        name="Student"
        component={ChatBot}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTab
             
              icon={require("../assets/student.png")}
              focused={focused}
            />
          ),
          tabBarLabel: "Student",
        }}
      />

      <Bottabs.Screen
        name="Accounts"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonTab
              
              icon={require("../assets/account.png")}
              focused={focused}
            />
          ),
          tabBarLabel: "Accounts",
        }}
      />
    </Bottabs.Navigator>
  );
};

export default Bottab;
