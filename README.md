# Verticast

## Description
A weather app targeted at climbers and mountaineers created for Android devices.

## Running the project
### Prerequisites
- Node.js
- JDK
- Android Studio (for Android development)
- runs on Windows (installation instructions are for Windows)

### Starting the application
1. **Clone the repository:**
   ```shell
   git clone https://github.com/Athena-E/verticast.git
   cd project_name
   ```
   
2. **Install dependencies**
   ```shell
   npm install
   # or
   yarn install   
   ```

3. **Start the Python development server**
   - Navigate to the 'backend' folder in the root.
   - Start the virtual environment:
   ```shell
   venv\Scripts\activate
   ```
   - Run `app.py`:
   ```shell
   python app.py
   ```

4. **Start the Metro Bundler**<br />
   Run the commands from the root of the project:
   ```shell
   npx react-native run-android
   # or
   npm start
   # or
   yarn start
   ```   

5. **Open the 'android' folder located in the root in Android Studio**
   - Go to Device Manager and select 'Add a new device'.
   - Select 'Medium Phone API 34' (Android 14.0)
   - Start the AVD.

## Libraries
### Core JavaScript Libraries
- **React**: ^18.2.0
- **React Native**: ^0.64.0

### Core Python Libraries
- **Flask**: ^3.0.3
- **openmeteo_requests**: ^1.2.0
- **openmeteo_sdk**: ^1.11.4

## Troubleshooting
- **Clear cache:**
   ```shell
   npx react-native start --reset-cache
   ```
- **Link native dependencies**
   ```shell
   npx react-native-asset
   ```


Notes (Athena-E)
- Android app, install Android studio

```
# rebuild app, use
npx react-native run-android
```
```
# run python backend
python app.py
```
- check api endpoint address and react development server address and modify if necessary

