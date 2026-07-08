export interface Songs{
    _id:string,
    title:string,
    audioUrl:string,
    artist:string,
    audioDuration:number
    createdAt:string,
    updatedAt:string,
    albumId:string | null,
    releaseYear:number,
    imageUrl:string
}

export interface Albums{
    _id:string,
    artist:string,
    audioUrl:string,
    audioDuration:number
    imageUrl:string,
    createdAt:string,
    updatedAt:string,
    title:string,
    songs:Songs[],
    releaseYear:number


}

export interface MusicStore{
    songs:Songs[],
    albums:Albums[],
    isLoading:boolean,
    error:null | string,
    fetchAlbums:()=> Promise<void>,
    fetchAlbumsById:(albumId:string)=>Promise<void>,
    currentAlbum:null | Albums,
    featuredSongs:Songs[],
    madeForUSongs:Songs[],
    trendingSongs:Songs[]
    fetchFeaturedSongs:()=>Promise<void>,
    fetchMadeForUSongs:()=>Promise<void>,
    fetchTrendingSongs:()=>Promise<void>,
    fetchSongs:()=>Promise<void>,
    
    isAlbumsLoading:boolean,
    isAlbumsError:null | string,

    isFeatureSongLoading:boolean,
    featureSongError:null | string

    isMadeSongLoading:boolean,
    madeSongError:null | string

     isTrendingLoading:boolean,
    trendingSongError:null | string
    
    
}

export interface User {
  _id: string;
  clerkId: string;
  fullName: string;
  imageUrl: string;
}

export interface UserStore{
    users:User[],
    fetchUsers:()=>Promise<void>,
    isLoading:boolean,
    error:null | string,
}


export interface AdminStore{
    isAdmin:boolean,
    isLoading:boolean,
    error:null | string,
    checkAdmin:()=>Promise<void>;
    reset:()=>void
}

export interface SongsType{
  title:string,
  isLoading:boolean,
  error:null | string,
  songs:Songs[]
}
