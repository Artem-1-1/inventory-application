import 'dotenv/config'; 
import express from "express";
import indexRouter from "./routes/indexRouter.js"
import productsRouter from "./routes/productsRouter.js";
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

app.use('/', indexRouter);
app.use('/products', productsRouter);

export default app;