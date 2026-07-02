import { Song } from "../model/song.model.js";
import { Album } from "../model/album.model.js";
import { cloudinaryUpload } from "../utils/cloudinaryUpload.js";

export const createSong = async (req, res, next) => {

  if (!req.files || !req.files.audioFile || !req.files.imageFile)
    return res
      .status(400)
      .json({ success: false, data: null, message: "Please Upload All Files" });
      
      try {
    const audioUpload = await cloudinaryUpload(req.files.audioFile,"video");
    console.log(audioUpload.duration);
    const imageUpload = await cloudinaryUpload(req.files.imageFile,"image");

    const {title,artist,albumId} = req.body

    const newSong = new Song({
      title,
      artist,
      audioUrl: audioUpload.secure_url,
      imageUrl: imageUpload.secure_url,
      audioDuration: Math.round(audioUpload.duration),
      albumId: albumId || null,
    });
    
    await newSong.save()
    

    if (albumId) {
      await Album.updateOne(
        { _id: albumId },
        { $push: { songs: newSong._id } },
      );
    }

    res
      .status(201)
      .json({ success: true, data: newSong, message: "New song is created" });
  } catch (error) {
    console.log("error in creating song")
    console.log(error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song does not exists" });
    }
    if (song.albumId) {
      await Album.findByIdAndUpdate(
        song.albumId,
        { $pull: { songs: song._id } },
        { new: true },
      );
    }
    res.status(200).json({
      data: song,
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.log("Error in Deleting Song!", error.message);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  const { title, artist, releaseYear } = req?.body;
  const { imageFile } = req?.file;

  try {
    if (!imageFile || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please Upload All the Files" });
    }
    const imageUrl = await cloudinaryUpload(imageFile);
    const newAlbum = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await newAlbum.save();
    res
      .status(200)
      .json({ data: newAlbum, message: "Album Created Successfull" });
  } catch (error) {
    console.log(`Error creating in album ${error.message}`);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const album = await Album.findByIdAndDelete(id); // delete the entire album
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "Album does not exists" });
    }
    await Song.deleteMany({ albumId: id }); // delete all the songs in the album
    res.status(200).json({ data: album, message: "Album deleted Successfull" });
  } catch (error) {
    console.log(`Error Deleting in Album ${error.message}`);
    next(error);
  }
};

export const checkAdmin = (req, res) => {
  res.status(200).json({ admin: true, message: "You are Admin" });
};
