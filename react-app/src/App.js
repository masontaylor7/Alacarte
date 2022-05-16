import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage/HomePage';
import RecipesList from './components/RecipesList/RecipesList';
import NewRecipe from './components/NewRecipe/NewRecipe';
import IndividualRecipe from './components/IndividualRecipe/IndividualRecipe';
import { allRecipes } from './store/recipe';

function App() {
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const recipes = Object.values(useSelector(state => state.recipes));
  const dispatch = useDispatch();

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
          <Route path='/home' exact={true}>
            <HomePage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>

          <Route path='/browse/all' exact={true}>
            <RecipesList recipes={recipeFilter(0)}/>
          </Route>
          <Route path='/browse/breakfast' exact={true}>
            <RecipesList recipes={recipeFilter(1)}/>
          </Route>
          <Route path='/browse/lunch' exact={true}>
            <RecipesList recipes={recipeFilter(2)}/>
          </Route>
          <Route path='/browse/dinner' exact={true}>
            <RecipesList recipes={recipeFilter(3)}/>
          </Route>
          <Route path='/browse/dessert' exact={true}>
            <RecipesList recipes={recipeFilter(4)}/>
          </Route>
          <Route path='/browse/drinks' exact={true}>
            <RecipesList recipes={recipeFilter(5)}/>
          </Route>
          <Route path='/browse/snacks&apps' exact={true}>
            <RecipesList recipes={recipeFilter(6)}/>
          </Route>
          <Route path='/browse/holiday&seasonal' exact={true}>
            <RecipesList recipes={recipeFilter(7)}/>
          </Route>
          <Route path='/browse/vegan' exact={true}>
            <RecipesList recipes={recipeFilter(8)}/>
          </Route>
          <Route path='/browse/vegetarian' exact={true}>
            <RecipesList recipes={recipeFilter(9)}/>
          </Route>

          <Route path='/recipes/new' exact={true}>
            <NewRecipe />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/recipes/:recipeId' exact={true} >
            <IndividualRecipe />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
