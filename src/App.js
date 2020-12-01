import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios'
import HomePage from './components/HomePage';
import CreateRecipe from './components/CreateRecipe';
import Details from './components/Details';
import { baseURL, config } from './services'
import UpdateRecipe from './components/UpdateRecipe';

function App() {

  const [recipes, updateRecipes] = useState([])
  const [refresh, triggerRefresh] = useState(false)
  const history = useHistory()

  // GET REQUEST
  const getRecipes = async () => {
    const res = await axios.get(baseURL, config)
    updateRecipes(res.data.records)
  }

  useEffect(() => {
    getRecipes()
  }, [refresh])

  // POST REQUEST
  const postRecipe = async (fields) => {
    await axios.post(baseURL, { fields, typecast: true }, config)
    updateRecipes([
      ...recipes,
      { fields }
    ])
    triggerRefresh(!refresh)
    history.push('/')
  }

  // DELETE REQUEST
  const deleteRecipe = async (id) => {
    await axios.delete(`${baseURL}/${id}`, config)
    triggerRefresh(!refresh)
  }

  // PUT REQUEST
  const updateRecipe = async (id, fields) => {
    await axios.put(`${baseURL}/${id}`, { fields, typecast: true }, config)
    triggerRefresh(!refresh)
    history.push('/')
  }

  return (
    <div >
      <Switch>
        <Route exact path="/">
          <HomePage recipes={recipes} deleteRecipe={deleteRecipe} />
        </Route>
        <Route path="/new">
          <CreateRecipe postRecipe={postRecipe} />
        </Route>
        <Route exact path="/recipes/:id">
          <Details recipes={recipes} />
        </Route>
        <Route exact path="/recipes/edit/:id">
          <UpdateRecipe recipes={recipes} updateRecipe={updateRecipe} history={history}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
