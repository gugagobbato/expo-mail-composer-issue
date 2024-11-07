import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEmail } from '@/hooks/useEmail';
import { useCallback, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { sendEmail } = useEmail();
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = useCallback(async () => {
    setIsSending(true);
    const body = 'Do not click on "CANCEL" button, just click outside the modal to dismiss it.';
    const subject = 'Now, do a backdrop dismiss on iOS';

    try {
      await sendEmail({
        to: 'teste@teste.com',
        subject,
        body,
        isHtml: false,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  }, [sendEmail]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to MailCompose Test!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        This is a test app to demonstrate the bug in the MailComposer.composeAsync 
        function, <Text style={{ fontWeight: 'bold' }}>specifically on iOS</Text>.
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Click "Contact us"</ThemedText>
        <ThemedText>Tap the "Contact us" button below to send an email request.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Wait for Mail to Open</ThemedText>
        <ThemedText>The Email Composer will open automatically, showing the prepared email.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Dismiss by Clicking Outside</ThemedText>
        <ThemedText>
          To dismiss the email without sending, tap the background outside the modal.
          {'\n\n'}
          <Text style={{ color: 'red' }}>PROBLEM: </Text>
          The button to send the email will remain disabled, and it should be enabled.
          {'\n'}
          This is a bug.
        </ThemedText>
      </ThemedView>
      <GestureHandlerRootView style={styles.contactButtonContainer}>
        <TouchableOpacity
          onPress={handleSendEmail}
          disabled={isSending}
          style={[styles.contactButton, { backgroundColor: isSending ? '#A1CEDC' : '#1D3D47' }]}>
          <ThemedText type="link" style={styles.contactButtonText}>
            {isSending ? 'Sending...' : 'Contact us'}
          </ThemedText>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  contactButtonContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  contactButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});