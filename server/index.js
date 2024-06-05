import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import pg from 'pg';
import express from "express";

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const port=process.env.PORT||3001

const pool = new pg.Pool({
    user: 'default',
    host: 'ep-sparkling-wildflower-a4dpub6t-pooler.us-east-1.aws.neon.tech',
    database: 'verceldb',
    password: 'm6tsX1yDNAoV',
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rtno-test-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Пример маршрута
app.get('/dialogs_with_comments', (req, res) => {
    console.log("Запрос на получение данных из базы данных");
    pool.query('SELECT * FROM dialogs_with_comments', (error, result) => {
        if (error) {
            console.error("Ошибка при выполнении запроса:", error);
            return res.status(500).send('Ошибка при выполнении запроса');
        }
        console.log("Данные из базы данных успешно получены и отправлены");
        res.json(result.rows);
    });
});
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
