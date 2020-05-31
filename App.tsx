import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {createStackNavigator} from '@react-navigation/stack';
import {useIsFocused, NavigationContainer} from '@react-navigation/native';

// webview screen
const WebViewScreen = ({route, navigation}: any) => {
  const webViewRef = useRef<WebView>(null);
  const isFocused = useIsFocused();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: route?.params?.url || 'https://www.google.co.jp/'}}
        ref={webViewRef}
        onLoadStart={({nativeEvent}) => {
          if (isFirstLoading || !isFocused) {
            return;
          }
          navigation.push('WEB_VIEW', {url: nativeEvent.url});
        }}
        onLoad={() => {
          setIsFirstLoading(false);
          webViewRef?.current?.goBack();
        }}
      />
    </SafeAreaView>
  );
};

// navigation
const Stack = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'WEB_VIEW'}
          component={WebViewScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// root component
const App = () => {
  return <Navigator />;
};

export default App;
