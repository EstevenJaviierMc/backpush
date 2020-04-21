import express from 'express';
import consign from 'consign'
import 'dotenv/config'

const app = express();

consign({ cwd: __dirname })
    .include('config/app.js')
    .then('routes')
    .into(app);