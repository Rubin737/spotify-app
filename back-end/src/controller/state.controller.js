import User from "../model/user.model.js";
import {Album} from "../model/album.model.js"
import {Song} from "../model/song.model.js"

export const getAllStats=async(req,res,next)=>{
    try {
     
        const [totalUsers,totalAlbums,totalSongs,totalArtists]=await Promise.all([
            User.countDocuments(),
            Album.countDocuments(),
            Song.countDocuments(),

            Song.aggregate([
        { $unionWith: { coll: "albums", pipeline: [] } },
        { $group: { _id: "$artist" } },
        { $count: "count" }
        ])
        ])

        res.status(200).json({data:{totalAlbums,totalUsers,totalSongs,totalArtists:totalArtists[0]?.count||0}})
    
    } catch (error) {
        next(error)
    }
}

