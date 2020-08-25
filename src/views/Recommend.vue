<template>
  <div>
    <banner />
    <song-list />
    <music-list />
    <artist-list />
  </div>
</template>

<script>
import Banner from '@/components/recommend/Banner';
import SongList from '@/components/recommend/SongList';
import MusicList from '@/components/recommend/MusicList';
import ArtistList from '@/components/recommend/ArtistList';
export default {
  components:{
    Banner,
    SongList,
    MusicList,
    ArtistList
  }
};
</script>