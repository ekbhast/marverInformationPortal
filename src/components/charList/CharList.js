import './charList.scss';
import { Component } from 'react';
// import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component{

    state = {
        chars: [],
        error: false,
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharsLoaded = (chars) => {
        this.setState ({
            chars,
            loading: false,
            error: false,
        })    
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    generateListChars(chars){
        let key = 0;
        const elements = chars.map(item => {
            const {name, thumbnail} = item;
            key++;
                return (
                    <li key={key} className="char__item">
                        <img src={thumbnail} alt={name} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'} }/>
                        <div className="char__name">{name}</div>
                    </li>
                    )
            })
            return elements;
    }

    render(){
        const {chars, loading, error} = this.state;
        const items = this.generateListChars(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;