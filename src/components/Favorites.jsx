import React from 'react'
import { useGlobalContext } from '../Context'

const Favorites = () => {

  const {favotites,selectMeal,removeFavorites} = useGlobalContext();

  return (
    <section className='favorites' >
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favotites.map((item)=> {
            const {idMeal,strMealThumb:image} = item
            return (
              <div key={idMeal} className='favorite-item'>
                <img src={image} alt={idMeal} className='favortes-img img' onClick={()=> selectMeal(idMeal,true)} />
                <button className="remove-btn" onClick={()=> removeFavorites(idMeal)} >
                  remove
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Favorites