import app from "./app";
import DBConnection from "./database/DBConnection";

const PORT = process.env.PORT || 3333;

const dbConnection = new DBConnection();
dbConnection.createConnection();

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));