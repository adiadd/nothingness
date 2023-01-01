import { StatusBar } from "expo-status-bar";
import React, { ReactNode, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  const [textPassed, onTextPassed] = React.useState<any>(null);
  const [visibility, setVisibility] = React.useState(true);
  const colorAnimation = useRef(new Animated.Value(0)).current;

  const handleSubmit = () => {
    setVisibility(false);
    Keyboard.dismiss();

    Animated.timing(colorAnimation, {
      toValue: 255,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(colorAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      onTextPassed(null);
      setVisibility(true);
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <FadePanel
            children={
              <Animated.View>
                {/* <Text style={styles.fadingText}>{textPassed}</Text> */}
              </Animated.View>
            }
            visible={visibility}
          />

          <FadePanel
            children={
              <TextInput
                style={styles.input}
                onChangeText={onTextPassed}
                value={textPassed}
                placeholder="Type away your thoughts..."
                keyboardType="default"
                multiline={true}
                textAlignVertical="top"
                blurOnSubmit={true}
                onSubmitEditing={() => handleSubmit()}
                textAlign="center"
              />
            }
            visible={visibility}
          />

          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    outline: "none",
    paddingVertical: 0,
    fontSize: 40,
    marginLeft: 5,
    margin: 10,
    minWidth: 250,
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  images: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  fadingText: {
    fontSize: 28,
  },
});

type Props = {
  children: React.ReactNode;
  visible: boolean;
};

function FadePanel({ children, visible }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else if (!visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
