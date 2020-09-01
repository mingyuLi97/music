export default class Song{
  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.picUrl = data.al ? data.al.picUrl : data.album.picUrl;
    this.artist = this.getArtist(data.ar || data.artists);
    this.album = data.al ? data.al.name : data.album.name;
    this.duration = data.duration || data.dt;
    this.mp3Url = `https://music.163.com/song/media/outer/url?id=${this.id}.mp3`;
    this.playCount = data.playCount || 0;
    this.score = data.score || 0;
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