import React from 'react'
import { useStateContext } from '../context/StateContext'
import Card from './Card'
const HomeUser = () => {
  const { userCategories } = useStateContext()
  return (
    <div className='cards-category-container'>
      {userCategories?.map((categoria,i)=> <Card  key={i} nombre={categoria.label} id={categoria.id}></Card>)}
    </div>
  )
}

export default HomeUser