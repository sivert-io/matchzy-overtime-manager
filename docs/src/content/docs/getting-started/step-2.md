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
   # Use server-id as prefix. e.g. server1_<variable_name>
   server1_rcon_host="127.0.0.1"   # Replace with your CS2 server IP
   server1_rcon_port="27016"       # Change if your RCON port is different
   server1_rcon_password="your_rcon_password" # Set your actual RCON password
   
   # Maximum number of rounds allowed before calculating the winner
   max_rounds=30 # Adjust as needed
   ```

3. **Save the file** and ensure it is correctly formatted.

Once the `.env` file is configured, proceed to [Step 3: Starting MOM](step-3).
