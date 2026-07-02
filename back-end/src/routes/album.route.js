import { Router } from "express";
import { getAlbums, getAlbumsById } from "../controller/album.controller.js";
const albumRouter=Router();

albumRouter.get('/get-albums',getAlbums)
albumRouter.get('/get-albums/:albumId',getAlbumsById)
export default albumRouter;