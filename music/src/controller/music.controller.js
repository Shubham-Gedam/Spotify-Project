import {uploadFile, getPresignedUrl } from '../services/storage.service.js';
import musicModel from '../models/music.model.js';
import playlistModel from "../models/playlist.model.js"



export async function uploadMusic(req, res) {

    const musicFile = req.files['music'][0];
    const coverImageFile = req.files['coverImage'][0];

    try {
        const musicKey = await uploadFile(musicFile);
        const coverImageKey = await uploadFile(coverImageFile);

        const music = await musicModel.create({
            title: req.body.title,
            artist: req.user.fullname.firstname + " " + req.user.fullname.lastname,
            artistId: req.user.id,
            musicKey,
            coverImageKey
        })

        return res.status(201).json({ message: 'Music uploaded successfully', music });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

export async function getMusicById(req,res,) {
    const {id} = req.params;

    try {
        const music = await musicModel.findById(id).lean()
        
        if(!music){
            return rs.status(400).json({
                message:"Music not found"
            })
        }
        music.musicUrl = await getPresignedUrl(music.musicKey)
        music.coverImageUrl = await getPresignedUrl(music.coverImageKey)

        return res.status(200).json({music});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
}

export async function getAllMusics(req,res) {

    const { skip = 0, limit= 10 } = req.query;

    try {
        const musicDocs = await musicModel.find().skip().limit(limit).lean()

        const musics = []

        for(let music of musicDocs){
            music.musicUrl = await getPresignedUrl(music.musicKey)
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey)
            musics.push(music);
        }
        return res.status(200).json({
            message:"music fetch succesfully",
            musics})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
}

export async function getArtistMusic(req, res) {

    try {
        const musicsDocs = await musicModel.find({ artistId: req.user.id }).lean();

        const musics = []

        for (let music of musicsDocs) {
            music.musicUrl = await getPresignedUrl(music.musicKey);
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey);
            musics.push(music)
        }
        return res.status(200).json({ musicsDocs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createPlaylist (req,res){

    const { title, musics } = req.body;

    try {
        const playlist = await playlistModel.create({
            title,
            artist: req.user.fullname.firstname + " " + req.user.fullname.lastname,
            artistId: req.user.id,
            userId: req.user.id,
            music: musics 
        })
        return res.status(201).json({
            message: "playlist create successfully",
            playlist
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
}

export async function getPlaylists(req,res) {
    try {
        const playlist = await playlistModel.find({artistId: req.user.id})
        return res.status(200).json({playlist})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
}

export async function getPlaylistById(req,res) {
    
    const {id} = req.params;

    try {
        const playlistDocs = await playlistModel.findById(id).lean()

        if(!playlistDocs) {
            return res.status(404).json({
                message:"Playlist not Found"
            });
        }
        const musics = [];

        for(let musicId of playlistDocs.music) {
            const music = await musicModel.findById(musicId).lean();
            if(music){
                music.musicUrl = await getPresignedUrl(music.musicKey);
                music.coverImageUrl = await getPresignedUrl(music.coverImageKey)
                musics.push(music);
            }
        }
        playlistDocs.music = musics

        return res.status(200).json({
            playlist: playlistDocs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'internal server error'
        });
        
    }
}