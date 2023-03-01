const app = require("./src/app.js")
require("dotenv").config();
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


