export const matchzy_commands = {
  matchzy_remote_log_url:
    process.env.event_url || "http://localhost:3000/events",
  matchzy_remote_log_header_key: "server-id",
  MOM_value: null,
} as const;

// We use this for our TV server's (CSTV match streaming) commands
export const tv_commands = {
  tv_delay: 0,
  tv_delay1: 7,
  sv_deltaticks_enforce: 0,
} as const;
