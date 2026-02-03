import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import AllSnippet from './AllSnippet'
import Header from '../dashboard/Header/Header'

const SnippetContainer = () => {
    return (
        <div className=''>
            <Header />
            <div>
                <Sidebar />
                <AllSnippet />
            </div>
        </div>
    )
}

export default SnippetContainer
