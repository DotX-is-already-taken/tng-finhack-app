import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar?: string;
  };
}

export default function ChatPage() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! I am your AI assistant. How can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Assistant",
          avatar:
            "https://ui-avatars.com/api/?name=AI&background=0D8ABC&color=fff",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage: IMessage = {
      _id: Math.random().toString(36).substring(7),
      text: inputText.trim(),
      createdAt: new Date(),
      user: {
        _id: 1, // Current user
        name: "User",
      },
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setInputText("");

    // Simulate a bot response
    setTimeout(() => {
      const botMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: `I received your message: "${newMessage.text}". I am a friendly bot!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Assistant",
          avatar:
            "https://ui-avatars.com/api/?name=AI&background=0D8ABC&color=fff",
        },
      };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
    }, 1200);
  }, [inputText]);

  const renderMessage = ({ item }: { item: IMessage }) => {
    const isUser = item.user._id === 1;

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.messageRowUser : styles.messageRowBot,
        ]}
      >
        {!isUser && item.user.avatar && (
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        )}
        <View
          style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.messageTextUser : styles.messageTextBot,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom + 15 },
      ]}
    >
      <View style={{ height: "100%", width: "100%", backgroundColor: "#d6e9ffff" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderMessage}
            inverted
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#8E8E93"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]}
              onPress={onSend}
              disabled={!inputText.trim()}
            >
              <Ionicons
                name="send"
                size={20}
                color="#fff"
                style={{ marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1565C0",
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowBot: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bubbleUser: {
    backgroundColor: "#007AFF", // Premium iOS blue
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: "#F0F0F5", // Light clean gray
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  messageTextUser: {
    color: "#fff",
  },
  messageTextBot: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopColor: "#E8E8E8",
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F0F0F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 10 : 8,
    paddingBottom: Platform.OS === "ios" ? 10 : 8,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 40,
    color: "#333",
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
