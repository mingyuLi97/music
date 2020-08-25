export default class Song{
  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.picUrl = data.picUrl;
    this.artist = this.getArtist(data.song.artists);
    this.album = data.song.album;
    this.duration = data.song.duration;
    this.mp3Url = `https://music.163.com/song/media/outer/url?id=${this.id}.mp3`;
    this.playCount = data.song.playCount || 0;
    this.score = data.song.score;
  }
  
  getArtist(singer){
    let ret = [];
    if (!singer) {
      return '';
    }
    singer.map(item => {
      ret.push(item.name);
    });
    return ret.join(' / ');
  }
}