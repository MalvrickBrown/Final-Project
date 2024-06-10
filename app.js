import express from "express";
import morgan from "morgan";
import cors from "cors";

// Imports for Image Upload Packages/Middleware
import multer from "multer";

import { fleetRouter } from "./Routes/fleetRouter.js";
import {authRouter} from './Routes/authRouter.js'
import { bookingRouter } from "./Routes/bookingRouter.js";
import fileUpload from "express-fileupload";

const app = express();
app.options('*', cors(['http://localhost:4200','http://localhost:46500']));
app.use(cors(['http://localhost:4200','http://localhost:46500']));

const port = 8888;

// JSON Configurations - Body Parser & URRL Encoding
app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ extended: true, limit: '1000kb'}));

if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// To utilize static folder to store Image file Uploads
app.use('/uploads', express.static('uploads'));

// Specify the size limit of the files being uploaded
app.use(
    fileUpload({
        limits:{
            fileSize: 100 * 1024 * 1024,
        },
        abortOnLimit: true,
    })
)

// Cors connection set up

// ROUTES FOR THE API
app.use('/api/v1/Rental', fleetRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/Book', bookingRouter);

// PORT
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}...`))