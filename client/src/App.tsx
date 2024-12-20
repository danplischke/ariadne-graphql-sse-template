import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {gql, useSubscription} from 'urql';

const subscriptionQuery = gql`
    subscription {
        counter
    }
`;

function App() {
    const [result] = useSubscription({
        query: subscriptionQuery,
    });

    const {data} = result;

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                    SSE Counter: {data?.counter ?? 'Loading...'}
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
