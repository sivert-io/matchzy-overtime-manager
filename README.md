# Matchzy Overtime Manager (MOM) ⚡

MOM is an extension for the MatchZy CS2 plugin. It runs as an Express server in TypeScript, listens for get5 events, and enforces custom overtime rules to prevent excessive overtimes in tournaments. 🎮🏆

## Table of Contents 📖
- [Features ✨](#features-)
- [Installation 🛠️](#installation-️)
  - [Prerequisites 📌](#prerequisites-)
  - [Setup 🔧](#setup-)
  - [Environment Configuration 🌍](#environment-configuration-)
  - [Running with Docker 🐳](#running-with-docker-)
- [CS2 Server Configuration ⚙️](#cs2-server-configuration-️)
- [Development 🏗️](#development-️)
- [Contributing 🤝](#contributing-)
- [Thanks 🙌](#thanks-)

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

### Environment Configuration 🌍

Before running MOM, you need to configure your environment variables:

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```
2. Open `.env` and replace the values with your server configuration:
   ```ini
   # Use server-id as prefix. e.g. server1_<variable_name>
   server1_rcon_host="127.0.0.1"
   server1_rcon_port="27016"
   server1_rcon_password="your_rcon_password"
   
   # Maximum number of rounds allowed before calculating the winner
   max_rounds=30
   ```

### Running with Docker 🐳

To start MOM using Docker:

1. Build the Docker image:
   ```sh
   docker build -t matchzy-overtime-manager .
   ```

2. Run the container:
   ```sh
   docker run -d -p 3000:3000 --name matchzy-overtime-manager matchzy-overtime-manager
   ```

Alternatively, you can use Docker Compose:
   ```sh
   docker-compose up -d
   ```

## CS2 Server Configuration ⚙️

To make get5 send match events to MOM, [update your CS2 server’s `matchzy_remote_log_url` parameter](https://shobhit-pathak.github.io/MatchZy/configuration/#matchzy_remote_log_url):

Add this line to your `/game/csgo/cfg/MatchZy/live.cfg` file at the top:

```bash
matchzy_remote_log_url "http://127.0.0.1:3000/events"
matchzy_remote_log_header_key "server-id"
matchzy_remote_log_header_value "server1"
```

Replace `127.0.0.1` with the actual IP address of your MOM server (if running on a different host).

Update field `matchzy_remote_log_header_value` with a unique ID for your server.

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
