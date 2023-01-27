let accessToken

const clientID = '1763191ebd264123b851f5802f286773'
const redirectUri = 'http://localhost:3000/'

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
        
    }
}

export default Spotify