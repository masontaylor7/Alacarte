import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import RecipesList from './components/RecipesList/RecipesList';
import NewRecipe from './components/NewRecipe/NewRecipe';
import IndividualRecipe from './components/IndividualRecipe/IndividualRecipe';
import { allRecipes } from './store/recipe';
import BrowseAllRecipes from './components/BrowseAllRecipes/BrowseAllRecipes';
import SavedRecipes from './components/SavedRecipes/SavedRecipes';
import CollectionRecipesList from './components/CollectionRecipeList/CollectionRecipeList';
import SplashPage from './components/SplashPage/SplashPage';
import ErrorPage from './components/404Page/404Page';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const recipes = Object.values(useSelector(state => state.recipes));


  useEffect(() => {
    dispatch(allRecipes())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const recipeFilter = (categoryId) => {
    if (categoryId === 0) {
      return recipes;
    } else {
      let categoryRecipes = recipes.filter(recipe => recipe.category_id === categoryId)
      return categoryRecipes;
    }
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className='full_body'>
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>

          <ProtectedRoute path='/browse/all' exact={true}>
            <BrowseAllRecipes />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/breakfast' exact={true}>
            <RecipesList recipes={recipeFilter(1)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/lunch' exact={true}>
            <RecipesList recipes={recipeFilter(2)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/dinner' exact={true}>
            <RecipesList recipes={recipeFilter(3)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/dessert' exact={true}>
            <RecipesList recipes={recipeFilter(4)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/drinks' exact={true}>
            <RecipesList recipes={recipeFilter(5)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/snacks&apps' exact={true}>
            <RecipesList recipes={recipeFilter(6)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/holiday&seasonal' exact={true}>
            <RecipesList recipes={recipeFilter(7)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/vegan' exact={true}>
            <RecipesList recipes={recipeFilter(8)} />
          </ProtectedRoute>
          <ProtectedRoute path='/browse/vegetarian' exact={true}>
            <RecipesList recipes={recipeFilter(9)} />
          </ProtectedRoute>

          <ProtectedRoute path='/recipes/new' exact={true}>
            <NewRecipe />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute> */}
          <ProtectedRoute path='/collections' exact={true} >
            <SavedRecipes />
          </ProtectedRoute>

          <ProtectedRoute path='/collections/:collectionId' exact={true} >
            <CollectionRecipesList />
          </ProtectedRoute>
          <ProtectedRoute path='/recipes/:recipeId' exact={true} >
            <IndividualRecipe />
          </ProtectedRoute>
          <Route path='/*'>
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
