import expess from "express";
import multer from "multer";
import cors from "cors";

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
    /*methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"*/
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads", storage: storage });


const routes = (app) => {
    app.use(expess.json());
    app.use(cors(corsOption));
    
    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);

}

export default routes;