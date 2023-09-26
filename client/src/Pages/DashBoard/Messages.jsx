import React from "react";
import { Box, TextField, Button, Typography, Grid, Paper, Avatar } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Messages = ({}) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const messages = [
    { text: "Hi there!", sender: "bot" },
    { text: "Hi", sender: `${loggedUser?.username[0]}` },
    { text: "How can I help you", sender: "bot" },
    { text: "Send me some messages", sender: `${loggedUser?.username[0]}` },
    { text: "Ok", sender: "bot" },
    { text: "Waiting....", sender: `${loggedUser?.username[0]}` },
  ];

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [input, setInput] = React.useState("");

  /////////////////////////////////////// FUNCTIONS ////////////////////////////////////
  const handleSend = () => {
    if (input.trim() != "") {
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };


  return (
    <Box className="w-full h-[auto] bg-white rounded-lg mt-5 pb-4">
      <div className="flex justify-center text-xl pt-4">Messages</div>
      <Box className="w-full h-[14rem] p-4 rounded-lg overflow-scroll">
        <Box sx={{ flexGrow: 1, overflow: "scroll", p: 2 }}>
          {messages.map((message,index) => (
            <Message key={index} message={message} />
          ))}
        </Box>
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<Send />}
              onClick={handleSend}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Messages;

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}>
        <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
          {isBot ? "B" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 1,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "rgb(243 244 246)" : "rgb(243 244 246)",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}>
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
