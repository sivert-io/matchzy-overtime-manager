---
title: Step 5 Configuring Your CS2 Server ⚙️
description: This guide will help you set up and run MOM using different methods, including **npm** and **Docker**.
---

For **Matchzy Overtime Manager (MOM)** to work, you need to configure your CS2 server to send match events to MOM.

## 1. Install MatchZy
Before proceeding, ensure **MatchZy** is installed on your CS2 server. Follow the installation guide here: [MatchZy](https://shobhit-pathak.github.io/MatchZy/).

## 2. Modify the `live.cfg` File
Once MatchZy is installed, update your `live.cfg` file located in your CS2 server’s `cfg/` folder.

### Add These Lines to `live.cfg`:
```bash
matchzy_remote_log_url "http://127.0.0.1:3000/events"
matchzy_remote_log_header_key "server-id"
matchzy_remote_log_header_value "server1"
```

### Explanation:
- `matchzy_remote_log_url`: This tells MatchZy where to send event data.
- `matchzy_remote_log_header_key`: Defines the key for identifying servers. <span style="color: pink;font-weight: 800">Don't touch this line!</span>
- `matchzy_remote_log_header_value`: Sets a unique identifier for your CS2 server. <span style="color: lightgreen;font-weight: 800">Adjust per server</span>.

## 3. Restart Your CS2 Server?
After modifying `live.cfg`, the changes will take effect when a match goes live. No need to restart the server.

## 4. Verify MOM is Receiving Events
Start a match and check MOM’s logs:
```sh
docker logs -f matchzy-overtime-manager  # If using Docker
```
OR
```sh
npm start   # If running manually, check the terminal
```
You should see events printed in the console. 🎉 MOM is now fully set up!
