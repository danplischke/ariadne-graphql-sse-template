import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {cacheExchange, createClient, fetchExchange, Provider, subscriptionExchange} from 'urql';
import {createClient as createSSEClient, RequestParams} from 'graphql-sse';

const sseClient = createSSEClient({
    url: '/graphql/',
});

export const client = createClient({
    url: '/graphql/',
    exchanges: [
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(operation) {
                return {
                    subscribe: (sink) => {
                        const dispose = sseClient.subscribe(operation as RequestParams, sink);
                        return {
                            unsubscribe: dispose,
                        };
                    },
                };
            },
        }),
    ],
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider value={client}>
            <App/>
        </Provider>
    </StrictMode>,
)
