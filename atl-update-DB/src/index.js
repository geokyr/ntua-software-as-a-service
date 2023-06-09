const express = require("express");
const app = express();
const port = process.env.PORT;
require("../config/index.js");
const cors = require("cors");
app.use(cors());

app.options("*", cors());

// Import routes
const updateATLDatabase = require("./routes/updateATLDatabase");
const deleteATLRecords = require("./routes/deleteATLRecords");
const basicAuthentication = require("./routes/basicAuthentication");

// Checks if there are old collections and then delete them
function deleteATLRecordsfun() {
  deleteATLRecords();
}

// Every one minute, delete the old collections
setInterval(deleteATLRecordsfun, 60000);

// Updates the database
app.post("/updateATLDatabase", basicAuthentication, updateATLDatabase);

// Deletes the database
app.delete("/deleteATLRecords", deleteATLRecords);

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`actual-total-load-update-DB listening on port ${port}`);
});
