import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errrorInfo){
        console.log(error, errrorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;