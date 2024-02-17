import React, { useEffect, useState } from 'react';
import { Text, Image, View, Button, StyleSheet } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';

function Account() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut, sessionId } = useAuth();

  const [profilePicUrl, setProfilePicUrl] = useState(user?.imageUrl);

  useEffect(() => {
    setProfilePicUrl(user?.imageUrl);
  }, [user?.imageUrl]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {isLoaded ? (
        isSignedIn ? (
          <View style={styles.container}>
            <Image style={styles.profilePic} source={{ uri: profilePicUrl }} />
            <Text style={styles.greeting}>
              Welcome back, {user?.fullName || user?.username || 'User'}!
            </Text>
            {user?.hasVerifiedEmailAddress ? (
              <Text style={styles.verified}>Email Verified</Text>
            ) : (
              <Text style={styles.unverified}>Email Not Verified</Text>
            )}
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        ) : (
          <Text>Not Signed In</Text>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verified: {
    color: 'green',
    marginBottom: 10,
  },
  unverified: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Account;
