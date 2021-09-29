import React from 'react';
import {connect} from "react-redux";
import {StoreState} from "./store/reducers";
import {fetchTodos, deleteTodo} from "./store/actions";
import {Todo} from "./store/actions";

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    loading: boolean;
}

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            loading: false
        }
    }

    handleClick = () => {
        this.setState({loading: true});
        this.props.fetchTodos();
    };

    renderTodo = (todo: Todo): JSX.Element => {
        return <div onClick={() => this.handleDelete(todo.id)}>
            {todo.title}
        </div>;
    };

    componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>, snapshot?: any): void {
        if(this.props.todos.length > 0 && this.props.todos !== prevProps.todos) {
            this.setState({ loading: false });
        }
    }

    handleDelete(id: number) {
        this.props.deleteTodo(id);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Fetch todos</button>
                {this.state.loading ? 'Loading...' : null}
                {this.props.todos.map(this.renderTodo)}
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState) => ({ todos: state.todos });
const mapDispatchToProps = {
    fetchTodos,
    deleteTodo
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export { App };

