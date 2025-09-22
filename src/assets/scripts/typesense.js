import Typesense from 'typesense';

const TypeSense = new Typesense.Client({
    nodes: [
        {
            host: 'poptape.local',
            port: 443,
            protocol: 'https',
            path: '/search'
        }
    ],
    apiKey: '1ZUtsjrK8JkRU5ZvYFh2nD34ibB1mU76',
    connectionTimeoutSeconds: 2,
});

export default TypeSense;