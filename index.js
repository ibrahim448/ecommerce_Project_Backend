const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;



// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Run http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));

