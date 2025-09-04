import React from 'react'
import Header from '../MyComponents/Header'
import Footer from '../MyComponents/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({children}) {
  return (
    <div>
      <Header title="MY Todos list" searchBar={true} /> 
      <Outlet />
      <Footer />
      
    </div>
  )
}
