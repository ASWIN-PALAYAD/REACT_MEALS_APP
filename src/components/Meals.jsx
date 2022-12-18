import React from 'react'
import { useGlobalContext } from '../Context';
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {

    const {meals,loading,selectMeal,addToFavorites} = useGlobalContext();

    if(loading){
        return (
            <section className='section'>
                <h4>Loading...</h4>
            </section>
        )
    }

    if(meals.length < 1){
        return (
            <div className='section'>
                <h4>No meals mathched your search term... please try again</h4>
            </div>
        )
    }
   

  return (
    <section className='section-center'>
        {meals.map((singleMeal)=> {
            const {idMeal,strMeal:title,strMealThumb:image} = singleMeal;

            return (
               <article key={idMeal} className='single-meal'>  
                    <img src={image} alt="mealImage" className='img' onClick={() => selectMeal(idMeal)} />
                    <footer>
                        <h5>{title}</h5>
                        <button className='like-btn'onClick={()=> addToFavorites(idMeal)} ><BsHandThumbsUp/></button>
                    </footer>
               </article>
            )
        })}
    </section>
  )
}

export default Meals