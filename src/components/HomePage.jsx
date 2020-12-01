import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage({ recipes, deleteRecipe }) {
  return (
    <div>
      <h1>RECIPE BOOK</h1>
      {recipes.map((recipe,idx) => {
        return (
          <div key={idx}>
            <Link to={`/recipes/${recipe.id}`}>
              <h5>{recipe.fields.title}</h5>
            </Link>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            <hr/>
          </div>
        )
      })}
      <Link to="/new">
        <button>create a recipe</button>
      </Link>
    </div>
  )
}
