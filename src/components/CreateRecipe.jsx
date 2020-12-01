import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CreateRecipe.css'

function CreateRecipe({ postRecipe }) {

  const [ingredient, setIngredient] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    ingredients: [],
    steps: '',
  })

  const addIngredient = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        ingredient
      ]
    })
    setIngredient('')
  }

  const removeIngredient = (id) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((ingredient, idx) => idx !== id)
    })
  }
  const handleChange = (e) => {
    const { value, name } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = () => {
    console.log('before')
    postRecipe(formData)
    console.log('after')
  }
  return (
    <div>
      <Link to='/'>⬅ Back Home</Link>
      <h1>Add New Recipe</h1>
      <form className="form-one">
        <label htmlFor="title">Title:
          <input
            id='title'
            type="text"
            placeholder="title"
            name='title'
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="steps">Steps:
          <textarea
            id='steps'
            type="text"
            placeholder="steps"
            rows="16" cols="25"
            name="steps"
            value={formData.steps}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>

      <form onSubmit={(e) => addIngredient(e)}>
        <label htmlFor="ingredient">Ingredient:</label>
        <input
          type="text"
          placeholder="Add One"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <input type="submit" value="ADD" />
      </form>

      <div className='ingredients'>
        {formData.ingredients.map((ingredient, idx) => {
          return (
            <h6 key={idx} className='ingredient'>
              {ingredient}
              <button onClick={() => removeIngredient(idx)}>X</button>
            </h6>
          )
        })}
      </div>
      <button onClick={handleSave}>SAVE</button>
    </div>
  )
}

export default CreateRecipe