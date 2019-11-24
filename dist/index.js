"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
// Midelware (body parser)
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use(express_fileupload_1.default());
// Configuracion de CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de la aplicacion
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//Conectar DB
let uri = 'mongodb+srv://qrscanner:kIV5CknMU72FPsti@cluster0-gblzn.mongodb.net/scanner?retryWrites=true&w=majority';
mongoose_1.default.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos online');
});
//Levantar express 
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
