function getValues() {
    return fetch("https://api.spotify.com/v1/playlists/2PN15bXFeVMfFFOY64nsaX", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
        .then(function (data) {
            return data.json();
        })
        .then(function (responseJson) {
            let track = responseJson.tracks.items[Math.floor(Math.random() * responseJson.tracks.items.length)];
            return track
        })
}


getValues().then(track => {
    let emptyPhrase = [];
    let songName = track.track.name.toUpperCase();
    const isNumber = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/);
    console.log(songName);
    for (let index = 0; index < songName.length; index++) {
        console.log(songName[index])
        if (songName[index] === ' ') {
            emptyPhrase.push(' ')
        } else if (isNumber.test(songName[index]) === true) {
            emptyPhrase.push(songName[index])
        } else {
            emptyPhrase.push('_');
            phrase.innerText = emptyPhrase;
        }
    } console.log(emptyPhrase)
})