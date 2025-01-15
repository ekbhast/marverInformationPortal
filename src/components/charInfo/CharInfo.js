import { Component } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            console.log('апдейт чар')
            this.updateChar();
        }
    }

    updateChar = () => {
        const {id} = this.props;
        if (!id) {
            return;
        }
        this.onCharLoading();

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState ({
            char,
            loading: false,
            error: false,
        })    
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render(){
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null :  <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spiner}
                {content}

            </div>
        )
    }
}

const View = ({char}) =>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'} }alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
           {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {
                comics.map((item, i)=> {
                    return (
                        <li key = {i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }
            
           
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;