import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, CircularProgress } from "@mui/material";

function ChatSection({ messages, onSend }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerate = async () => {
    if (input.trim()) {
      setLoading(true);
      await onSend(input.trim());
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleGenerate();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              mb: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: msg.type === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.type === "user" ? "primary.light" : "grey.200",
              maxWidth: "75%",
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.type === "user" && <Typography> {msg.text} </Typography>}
            {msg.type === "bot" && (
              <>
                <Typography sx={{ mb: 1 }}>
                  <b>Prompt:</b> {msg.prompt}
                </Typography>
                <img
                  src={msg.image}
                  alt={msg.prompt}
                  style={{ maxWidth: 256, borderRadius: 8 }}
                />
              </>
            )}
          </Paper>
        ))}
        {/* Loader shown while waiting for image */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your image prompt..."
          disabled={loading}
        />
        <Button
          sx={{
            color: "black",
            fontWeight: 600,
            fontSize: '1rem',
            gap: "0.5rem",
            border: "2px solid #01D9D1",
            minWidth: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            borderRadius:'16px',
            textTransform: 'none'
          }}
          onClick={handleGenerate}
          disabled={loading}
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
}

export default ChatSection;
