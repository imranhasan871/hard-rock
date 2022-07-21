/**
 * Search Songs from Song Api
 */
const searchSong = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        console.log('Link not found!!!😠😠😠😠😠😠😠');
    }
};
/**
 * Display Songs in Frontend
 * @param {*} songs
 */

const displaySongs = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach((song) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">
                            Album by <span>${song.artist.name}</span>
                        </p>
                         <audio controls>
                            <source src="${song.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>`;
        songContainer.appendChild(songDiv);
    });
};

/**
 * Display Lyrics In new Way
 */

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayErrorMessage('Lyrics not found. Please try again🌝🌝🌝🌝🌝🌝');
    }
};

const displayLyrics = (lyrics) => {
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
};

const displayErrorMessage = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
};
