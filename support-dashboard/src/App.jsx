import React from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import UsersList from './Components/UserList'
import ChatArea from './Components/ChatArea'


function App() {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <div className="flex-1 flex">
         <Header/>
         <UsersList/>
         </div>
         <div className="flex-1 p-4">
            <ChatArea/>
         </div>
         </div>
          
  )
}

export default App