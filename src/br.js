// GoogleComponent.js
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export default function GoogleComponent() {
  const openGoogleInAppBrowser = async () => {
    try {
      
          console.log('InAppBrowser is available');
          // Now that the in-app browser is available, you can open the link
          InAppBrowser.open('https://www.google.com', {
            // Add your custom options here
          });
        }
        
        
     catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Google" onPress={openGoogleInAppBrowser} />
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
}
