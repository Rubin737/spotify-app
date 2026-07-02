import { Router } from "express";
import { getAllSongs, getFeaturedSongs } from "../controller/song.controller.js";
const songRouter=Router();

songRouter.get("/all-songs", getAllSongs);
songRouter.get('/featured-songs',getFeaturedSongs);
songRouter.get("/trending-songs", getFeaturedSongs);
songRouter.get('/madeforu-songs',getFeaturedSongs)


export default songRouter;