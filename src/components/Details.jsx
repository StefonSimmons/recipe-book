import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Details({ recipes }) {
  const { id } = useParams()
  const recipe = recipes.filter(recipe => recipe.id === id)[0]
  // const { title, ingredients, steps } = recipe.fields

  return (
    <div>
      { recipe &&
        <>
          <Link to='/'>⬅️ Back Home</Link>
          <h2>{recipe.fields.title}</h2>
          <ul>
            {recipe.fields.ingredients && recipe.fields.ingredients.map((ingredient, idx) => {
              return <li key={idx}>{ingredient}</li>
            })}
          </ul>
          <p>{recipe.fields.steps}</p>
          <h5>{recipe.fields.created_at}</h5>
          <Link to={`/recipes/edit/${id}`}><button>EDIT</button></Link>
        </>
      }
    </div>
  )
}
