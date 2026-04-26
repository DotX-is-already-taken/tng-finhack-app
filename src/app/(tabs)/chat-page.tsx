import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar?: string;
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    // Initial message
    setMessages([
      {
        _id: "1",
        text: "Hello! I am your AI assistant. How can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Assistant",
          avatar:
            "https://ui-avatars.com/api/?name=AI&background=007AFF&color=fff",
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
    setIsTyping(true);

    // Handle specific queries
    let botResponse = `I received your message: "${newMessage.text}". I am your dedicated AI assistant.`;
    const normalizedText = newMessage.text.toLowerCase();

    if (
      normalizedText.includes("which merchant categories are underutilized?")
    ) {
      botResponse =
        "Based on our latest analytics, several merchant categories show utilization rates below 50%:\n\n• Optical: 21.23%\n• Childcare: 23.73%\n• Dental: 24.72%\n• Insurance: 49.71%\n• Learning: 49.87%\n\nCategories like Meals, Wellness, and Transport are performing well above the 50% threshold.";
    } else if (
      normalizedText.includes("which policy groups are overestimated?")
    ) {
      botResponse =
        "The most overestimated policy groups are:\n\n1. Meal Allowance (Score: 82,215)\n2. Childcare Support (Score: 81,459)\n3. Parental Care (Score: 81,135)\n\nThese groups show utilization rates as low as 8.65% to 9.85%, leaving over $81,000 unused in each pool.";
    }

    // Simulate a bot response with 7s latency
    setTimeout(() => {
      const botMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Assistant",
          avatar:
            "https://ui-avatars.com/api/?name=AI&background=007AFF&color=fff",
        },
      };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      setIsTyping(false);
    }, 7000);
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
          <Text
            style={[
              styles.timeText,
              isUser ? styles.timeTextUser : styles.timeTextBot,
            ]}
          >
            {item.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerInfo}>
          <View style={styles.botStatusDot} />
          <Text style={styles.headerTitle}>AI Assistant</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderMessage}
          inverted
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isTyping ? (
              <View style={styles.messageRowBot}>
                <Image
                  source={{
                    uri: "https://ui-avatars.com/api/?name=AI&background=007AFF&color=fff",
                  }}
                  style={styles.avatar}
                />
                <View style={[styles.bubble, styles.bubbleBot, styles.typingBubble]}>
                  <Text style={styles.typingText}>Thinking...</Text>
                </View>
              </View>
            ) : null
          }
        />

        <View style={[styles.inputWrapper, { paddingBottom: insets.bottom + 10 }]}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about underutilized policies..."
              placeholderTextColor="#999"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={onSend}
              disabled={!inputText.trim()}
            >
              <Ionicons name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  botStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34C759",
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowBot: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleUser: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextUser: {
    color: "#fff",
  },
  messageTextBot: {
    color: "#1C1C1E",
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  timeTextUser: {
    color: "rgba(255,255,255,0.7)",
  },
  timeTextBot: {
    color: "#8E8E93",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 48,
    color: "#1C1C1E",
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#A1C8F6",
    shadowOpacity: 0,
  },
  typingBubble: {
    backgroundColor: "#F2F2F7",
    borderWidth: 0,
  },
  typingText: {
    fontSize: 14,
    color: "#8E8E93",
    fontStyle: "italic",
  },
});
