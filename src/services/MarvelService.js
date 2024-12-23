

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=290eb8100efa9dd2b4ec966db570116e';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
    
        return await res.json();
        
    }

    getAllCharacters = async () => {
        const res =  await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        console.log('запрос прошел');
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }  

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].wiki,
            id: char.id,
            comics: char.comics.items
        }
    }
}

export default MarvelService;