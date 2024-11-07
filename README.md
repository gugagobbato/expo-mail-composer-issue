# expo-mail-composer-issue

This project demonstrates an issue with the [expo-mail-composer](https://docs.expo.dev/versions/latest/sdk/mail-composer/) library, specifically regarding the unexpected behavior when dismissing the email composer by tapping outside the modal (backdrop dismiss).

## Problem Description

The expected behavior when dismissing the email composer via a backdrop tap is:

1. **Promise Fulfillment**: The promise returned by `MailComposer.composeAsync()` should resolve, indicating the user’s action.
2. **"CANCEL" Status**: If the user dismisses the composer by clicking outside, the promise should resolve with a `"CANCEL"` status, or a similar status to indicate that the email was not sent.

### Actual Behavior

In `expo-mail-composer`, when the user taps outside the email composer (backdrop dismiss):

- **No status update is triggered**: The promise does not resolve, so the application remains in an ambiguous state.
- **No indication of cancellation**: There is no feedback or status returned to indicate that the user cancelled the action.

This can result in the app remaining in a "waiting" state with no clear feedback, causing a poor user experience.

## Reproduction Steps

1. Clone this repository.
2. Install dependencies by running:

   ```bash
   npm install
    ```

3. Run the app using:

    ```bash
    npm start
    ```

4. Tap the “Contact us” button to open the email composer.
5. Tap outside the email modal to dismiss it.
6. Observe that there is no response or resolution to indicate that the user cancelled the action.

Expected vs. Actual Behavior

--> **Expected Behavior**:

- Promise resolves with “CANCEL” status on dismiss;
- Clear indication of user cancellation.

--> **Actual Behavior**:

- No promise resolution or status update on backdrop dismiss;
- App remains in a waiting state with no response.
