import React from 'react'

const CardContext = React.createContext({
    items: [],
    totalamout: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
});

export default CardContext