import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const url = "http://127.0.0.1:5000/submitted_texts.json";

const ChatBot = () => {
  const [jsonss, setjsonss] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  function fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from JSON file:", data);
        setjsonss(data);
        console.log("jsonss", jsonss);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const userMessage = { text: inputMessage, user: "user" };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    const conversation = [
      { role: "system", content: jsonss },
      { role: "assistant", content: "this is the previous conversation" },
      { role: "user", content: inputMessage },
    ];

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beheycbarer sk-SheycbmNiYoL3IYIxgbsLheycbx6yqT3BlbkFheycbJ4sWHMqQHiZlMfvqNJiH1`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        messages: conversation,
        max_tokens: 4000,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("openai response", data);
        const botMessage = {
          text: data.choices[0].message.content,
          user: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) =>
        console.error("Error sending message to OpenAI:", error)
      );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        bottom={30}
        contentContainerStyle={{ padding: 10 }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.user === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.user === "user" ? "#007AFF" : "#EEE",
              borderRadius: 5,
              margin: 15,
              padding: 10,
              bottom: 30,
              top: 20
            }}
          >
            <Text style={{ color: item.user === "user" ? "white" : "black" }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          bottom: 60,
          margin: 20,
          marginTop: 30,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            backgroundColor: "#EEE",
          }}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity
          style={{
            marginLeft: 10,
            padding: 10,
            backgroundColor: "#007AFF",
            borderRadius: 5,
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatBot;
