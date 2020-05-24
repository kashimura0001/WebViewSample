import React, {useEffect, useRef, useState} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"WEB_VIEW"} component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const WebViewScreen = ({route, navigation}: any) => {
  const webViewRef = useRef<WebView>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{ uri: route?.params?.url || "https://kasssssy.hatenablog.com/" }}
        ref={webViewRef}
        onLoadStart={({ nativeEvent }) => {
          if(pageLoaded) {
            webViewRef?.current?.stopLoading();
            navigation.push('WEB_VIEW', { url: nativeEvent.url })
          }
          setPageLoaded(true)
        }}
      />
    </View>
  );
};

const App = () => {
  return (
    <Navigator />
  );
};


export default App;
