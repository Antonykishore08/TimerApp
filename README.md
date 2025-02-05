# React Native App

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Assumptions Made During Development](#assumptions-made-during-development)

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended LTS version)
- [Yarn](https://yarnpkg.com/) or npm
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
   or
   ```sh
   npm install
   ```

### Running the App

#### For Android

1. Start the Metro bundler:
   ```sh
   yarn start
   ```
2. Run the app on an Android device or emulator:
   ```sh
   yarn android
   ```

#### For iOS (MacOS only)

1. Install CocoaPods dependencies:
   ```sh
   cd ios && pod install && cd ..
   ```
2. Run the app on an iOS simulator:
   ```sh
   yarn ios
   ```

## Assumptions Made During Development

- The app follows a **React Native CLI** setup (not Expo).
- The app supports both **Android** and **iOS** platforms.
- All dependencies are compatible with React Native version **X.X.X** (replace with actual version).
- The project uses **TypeScript** (if applicable, otherwise replace with JavaScript).
- The backend API is accessible and provides the required endpoints.
- Environment variables are stored in a `.env` file (if applicable).
- The app is developed following best practices for **state management**, possibly using **Redux**, **Recoil**, or **Context API**.
- **Navigation** is handled using `react-navigation`.
- The app is styled using **Styled Components** or **React Native Stylesheets**.
- Debugging is done using **React Developer Tools**, **Flipper**, or **Reactotron**.

For any issues, please refer to the [official React Native documentation](https://reactnative.dev/docs/getting-started) or raise an issue in this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
