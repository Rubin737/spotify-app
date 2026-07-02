import {Album} from "../model/album.model.js"
export const getAlbums=async(req,res,next)=>{
    try {
        const albums=await Album.find();
        if(!albums){
            return res.status(400).json({message:"Albums doesn't exist"})
        }
        res.status(200).json({data:albums,success:true,message:"Successfull"})
    } catch (error) {
        console.log(`Error getting all the albums`);
        next()


    }
}

export const getAlbumsById=async(req,res,next)=>{
    const {albumId}=req.params;
    try {
        const album=await Album.findOne({_id:albumId}).populate("songs");
        console.log(album);
        if(!album) return res.status(400).json({message:"Album doesn't exist"})
        res.status(200).json({data:album,message:"Songs in the Album",success:true})
    } catch (error) {
        console.log("Error in getting  songs in the Album");
        next();
    }
}