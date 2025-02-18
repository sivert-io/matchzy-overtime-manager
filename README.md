# Matchzy Overtime Manager ⚡

Matchzy Overtime Manager is an extension for the MatchZy CS2 plugin. It runs as an Express server in TypeScript, listens for get5 events, and enforces custom overtime rules to prevent excessive overtimes in tournaments. 🎮🏆

## Features ✨
- 🎧 Listens for CS2 match events via get5
- ⚙️ Automatically handles overtime scenarios
- 📝 Written in TypeScript for type safety
- 🚀 Simple and lightweight Express server

## Installation 🛠️

### Prerequisites 📌
- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [TypeScript](https://www.typescriptlang.org/)
- A CS2 server with get5 (Matchzy) installed

### Setup 🔧
1. Clone the repository:
   ```sh
   git clone https://github.com/sivert-io/matchzy-overtime-manager.git
   cd matchzy-overtime-manager
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Build the project:
   ```sh
   npm run build
   ```

4. Start the server:
   ```sh
   npm start
   ```

## Configuration ⚙️

To make get5 send match events to Matchzy Overtime Manager, [update your CS2 server’s `matchzy_remote_log_url` parameter](https://shobhit-pathak.github.io/MatchZy/configuration/#matchzy_remote_log_url):

Use this console command:

```bash
matchzy_remote_log_url "url"
```

Replace `your-express-server-ip` with the actual IP address of your MatchZy Overtime Manager server.

## Development 🏗️

To add new features or modify existing functionality:

1. Start the TypeScript compiler in watch mode:
   ```sh
   npm run dev
   ```
2. Modify the source code in the `src/` directory.
3. Ensure changes work by running:
   ```sh
   npm run build && npm start
   ```

## Contributing 🤝

We welcome contributions! Feel free to open issues or submit pull requests. 🎉

## Thanks 🙌

A special thanks to:
- 🎯 [get5 developers](https://github.com/splewis/get5) for the original tournament framework.
- 🔥 The CS2 and LAN tournament community for testing and feedback.