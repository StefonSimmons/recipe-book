import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function UpdateRecipe({ recipes, updateRecipe, history }) {
  const { id } = useParams()

  const [formData, updateFormData] = useState({})
  const [ingredient, setIngredient] = useState('')

  useEffect(() => {
    const recipe = recipes.filter(recipe => recipe.id === id)[0]

    if (recipe) {
      updateFormData({
        title: recipe.fields.title,
        ingredients: recipe.fields.ingredients,
        steps: recipe.fields.steps
      })
    }
  }, [])

  const removeIngredient = (id) => {
    updateFormData({
      ...formData,
      ingredients: formData.ingredients.filter((ingredient, idx) => idx !== id)
    })
  }
  const addIngredient = (e) => {
    e.preventDefault()
    updateFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        ingredient
      ]
    })
    setIngredient('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    updateFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateRecipe(id, formData)

  }

  return (
    <div>
      <h3>EDIT</h3>
      <form>
        <label htmlFor="title">Title:
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="steps"> Steps:
          <input
            id='steps'
            type="text"
            nam='steps'
            value={formData.steps}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>

      <form onSubmit={(e) => addIngredient(e)}>
        <label htmlFor="ingredients">
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <input type="submit" value="ADD" />
      </form>
      <div className="ingredients">
        {formData.ingredients && formData.ingredients.map((ingredient, idx) => {
          return (
            <h6 key={idx} className="ingredient">
              {ingredient}
              <button onClick={() => removeIngredient(idx)}>X</button>
            </h6>
          )
        })}
      </div>
      <input type="button" value="SAVE" onClick={handleSave} />
      <input type="button" value="CANCEL" onClick={() => history.goBack()} />
    </div>
  )
}
