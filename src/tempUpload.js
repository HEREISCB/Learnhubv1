import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Title, Subheading, IconButton } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';




export default function Upload() {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://8cba-2a09-bac5-3e42-137d-00-1f1-1d3.ngrok-free.app/');
    
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
     

      <Card style={styles.container}>
        <Card.Content style={styles.centerContent}>
          <Title style={styles.title}>AI Education Platform</Title>
          <Subheading style={styles.subtitle}>Faculty Upload Zone</Subheading>
          
          <Button
            mode="contained"
            onPress={_handlePressButtonAsync}
            style={styles.uploadButton}
            icon="file-upload"
          >
            Upload Lecture Notes
          </Button>

          {result && (
            <Card style={styles.resultContainer}>
              <Card.Content>
                <Title style={styles.resultText}>Upload Result:</Title>
                <Text>{JSON.stringify(result)}</Text>
              </Card.Content>
            </Card>
          )}

          <Card style={styles.descriptionContainer}>
            <Card.Content>
              <Subheading style={styles.description}>
                For your security and to ensure the protection of your valuable information, we kindly guide you to identify any unusual activity. Clicking the button will seamlessly take you to your local web browser, providing you with a secure and enhanced user experience.
              </Subheading>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    margin: 10,
    elevation: 4,
  },
  centerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButton: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionContainer: {
    marginTop: 10,
    elevation: 4,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});
