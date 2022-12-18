import React,{useContext, useEffect,useState} from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealurl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavortesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }else{
        favorites = []
    }
    return favorites
}

const AppProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favotites, setFavotites] = useState(getFavortesFromLocalStorage());

    const fetchMeals = async(url) => {
        setLoading(true)
        try {
            const {data} = await axios(url)

            if(data.meals){
                setMeals(data.meals)
            }else{
                setMeals([])
            }

        } catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealurl)
    }

    const selectMeal = (idMeal,favoriteMeal) => {
        let meal;
        if(favoriteMeal){
            meal = favotites.find((meal)=> meal.idMeal === idMeal);
        }else{
            meal = meals.find((meal)=> meal.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToFavorites = (idMeal) => {
        const alreadyFavorite = favotites.find((meal)=> meal.idMeal === idMeal);
        if(alreadyFavorite) return alert("item already added to favorites")
        const meal = meals.find((meal)=> meal.idMeal === idMeal);
        const updatedFavorites = [...favotites,meal];
        setFavotites(updatedFavorites);
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    }

    const removeFavorites = (idMeal) => {
        const updatedFavorites = favotites.filter((meal)=> meal.idMeal !== idMeal);
        setFavotites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    }


    useEffect(()=> {
        fetchMeals(allMealsUrl);
    },[])

    useEffect(()=> {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    },[searchTerm])

    
    

    return <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectMeal,selectedMeal,
                                        closeModal,favotites,addToFavorites,removeFavorites}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider}