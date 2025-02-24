---
title: Step 2 Setting Up Environment Variables 🌍
description: This guide will help you set up and run MOM using different methods, including **npm** and **Docker**.
---

Before running **Matchzy Overtime Manager (MOM)**, you need to configure your environment variables.

## What are Environment Variables?

Environment variables store configuration settings outside the source code, making it easy to adjust settings without modifying the program.

## Instructions

1. **Copy the example environment file**:

```sh
cp .env.example .env
```

2. **Modify `.env` to match your server configuration**:
   Open `.env` in a text editor and update the following values:

```ini
# Server 1 configuration
server1_rcon_host="127.0.0.1"         
server1_rcon_port="27015"             
server1_rcon_password="your_rcon_password"  

# Server 2 configuration
server2_rcon_host="127.0.0.1"
server2_rcon_port="27016"
server2_rcon_password="your_second_rcon_password"

# Maximum number of rounds allowed before calculating the winner
max_rounds=30 # Adjust as needed
```

The `max_rounds` variable determines how many rounds are played before declaring a winner; for example, setting it to **24** means no overtime is allowed, **30** triggers one overtime period, **36** allows for two overtimes, and so on.

3. **Save the file** and ensure it is correctly formatted.

Once the `.env` file is configured, proceed to [Step 3: Starting MOM](step-3).
