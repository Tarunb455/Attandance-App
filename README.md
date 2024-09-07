
# Project Setup

## React Native Setup

### Steps:
1. **Download the Zip file** from GitHub and extract the contents.
2. **Set up API URL**:  
   In the root folder, create or update the `.env` file with your local IPv4 address for the API:
   ```env
   API_URL=http://192.168.177.142:3030/api
   ```
3. **Open your code editor**, then run the following commands in the terminal (from the root folder):
   ```bash
   npm init -y
   npm install
   npx expo start
   ```
4. **Expo CLI Recommendations**:
   - Press `s` to switch to development build mode.
   - Download the **Expo Go** app from the Play Store to preview your app on your mobile device.

---

## Backend Setup

### Steps:
1. **Open a separate terminal** and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. **Run the following commands**:
   ```bash
   npm init -y
   npm install
   nodemon start
   ```

---

## Additional Notes:
- Ensure **Node.js** and **npm** are installed on your system.
- If you haven't installed **Expo CLI** globally, run the following command:
   ```bash
   npm install -g expo-cli
   ```
- Keep the backend running while developing to ensure the API works with the frontend.

---
