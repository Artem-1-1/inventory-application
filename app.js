import 'dotenv/config'; 
import express from "express";
import indexRouter from "./routes/indexRouter.js"
import productsRouter from "./routes/productsRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/products', productsRouter);

app.use((req, res) => {
  res.status(404).render("404", {title: "Page not Found"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

export default app;