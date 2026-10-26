import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [token] = useAuth()
  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, { title, contents, ingredients, imageUrl }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='create-imageUrl'>Image URL: </label>
      <input
        type='text'
        name='create-imageUrl'
        id='create-imageUrl'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div>
        <input
          type='image'
          id='image'
          alt='Login'
          src={imageUrl}
          style={{ width: 200, height: 150 }}
        />
      </div>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
      </div>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating....' : 'Create'}
        disabled={!title}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
