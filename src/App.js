import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./component/Sidebar";
import ChatSection from "./component/ChatSection";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (prompt) => {
    setMessages((prev) => [...prev, { type: "user", text: prompt }]);
    try {
      const response = await fetch("https://img-gen-be.onrender.com/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.imageUrl) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", image: data.imageUrl, prompt }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", prompt, image: "", error: "Image generation failed" }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", prompt, image: "", error: "API error" }
      ]);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Sidebar />
      <ChatSection messages={messages} onSend={handleSend} />
    </Box>
  );
}

export default App;
