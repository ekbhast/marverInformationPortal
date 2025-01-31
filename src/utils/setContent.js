import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch(process){
        case 'waiting':
            return <Skeleton/>;
            // eslint-disable-next-line
            break;
        case 'loading':
            return <Spinner/>;
            // eslint-disable-next-line
            break;
        case 'confirmed':
            return <Component data={data}/>
            // eslint-disable-next-line
            break;
        case 'error':
            return <ErrorMessage/>;
            // eslint-disable-next-line
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;