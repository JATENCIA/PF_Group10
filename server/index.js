const app = require("./src/app");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
