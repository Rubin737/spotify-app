import {Song} from "../model/song.model.js"

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    if (!songs)
      return res
        .status(400)
        .json({ success: false, message: "Songs are not exist" });
    res.status(200).json({ data: songs, message: "Successfull" });
  } catch (error) {
    next();
  }
};

export const getFeaturedSongs=async(req,res,next)=>{
    try {
        const featured=await Song.aggregate([
            {$sample:{
                size:18
            }},
            {$project:{albumId:0}}
        ])
       
        if(featured.length===0) return res.status(404).json({message:"No featured songs",success:false})
        res.status(200).json({data:featured,success:false,message:"Featured songs"})
    } catch (error) {
        next(error)
    }
}
