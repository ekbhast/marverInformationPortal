import './charList.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';

// import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component{

    state = {
        chars: [],
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onRequest = (offset) => {
        this.updateChars(offset)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    updateChars = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharsLoaded = (newChars) => {

        let ended = false;
        if(newChars.length < 9){
            ended = true;
        }

        this.setState (({offset, chars}) => ({
                chars: [...chars, ...newChars],
                loading: false,
                error: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
        }))    
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    generateListChars(chars){
        const elements = chars.map(item => {
            const {name, thumbnail, id} = item;
                return (
                    <li 
                        key={id} 
                        className="char__item"
                        onClick={() => this.props.onCharSelected(id)}>
                        <img src={thumbnail} alt={name} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'} }/>
                        <div className="char__name">{name}</div>
                    </li>
                    )
            })
            return elements;
    }

    render(){
        const {chars, loading, error, offset, newItemLoading, charEnded} = this.state;
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
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none': 'block'}}
                    onClick={() => this.onRequest(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;