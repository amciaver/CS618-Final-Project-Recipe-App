import { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [token] = useAuth()

  const [createPost, { loading, data, error }] = useGraphQLMutation(
    CREATE_POST,
    {
      variables: {
        title,
        contents,
        ingredients,
        imageUrl,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
    },
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    createPost()
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

      <div>
        <label htmlFor='create-imageUrl'>Image URL: </label>
        <input
          type='text'
          id='create-imageUrl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt='Post preview'
            style={{ width: 200, height: 150, objectFit: 'cover' }}
          />
        </div>
      )}

      <br />

      <div>
        <label htmlFor='create-contents'>Description: </label>
        <textarea
          id='create-contents'
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
        <textarea
          id='create-ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <br />

      <input
        type='submit'
        value={loading ? 'Creating....' : 'Create'}
        disabled={!title || loading}
      />

      {error && <div>Error creating post: {error.message}</div>}

      {data?.createPost ? (
        <>
          <br />
          Post{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
    </form>
  )
}
