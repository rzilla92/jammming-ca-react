let accessToken

const clientID = '1763191ebd264123b851f5802f286773'
const redirectUri = 'http://127.0.0.1:5173/'

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken
        }

        // Token match check
        const regexToken = /access_token=([^&]*)/
        const regexExp = /expires_in=([^&]*)/
        const tokenMatch = window.location.href.match(regexToken)
        const expiryMatch = window.location.href.match(regexExp)

        if(tokenMatch && expiryMatch) {
            accessToken = tokenMatch[1]
            const expiry = Number(expiryMatch[1])
            
            // wipes the access token and URL parameters
            window.setTimeout(() => accessToken = '', expiry * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
        
    },

    search(term) {
        const accessToken = Spotify.getAccessToken()
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`
        return fetch(endpoint, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id : track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name,trackUris) {
        if (!name || !trackUris.length) {
            return
        }
        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userId
        const endpoint = 'https://api.spotify.com/v1/me'
        
        return fetch(endpoint, {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id
                const playlistEp = `https://api.spotify.com/v1/users/${userId}/playlists`
                
                return fetch(playlistEp, {
                    headers : headers,
                    method : 'POST',
                    body: JSON.stringify({
                        name: name
                    })
                        .then(response => response.json())
                        .then(jsonResponse => {
                            const playlistId = jsonResponse.id
                            const trackEp = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`
                            
                            return fetch(trackEp, {
                                headers : headers,
                                method : 'POST',
                                body: JSON.stringify({
                                    uris: trackUris
                                })
                            })
                        })
                })
            })
    }
}

export default Spotify