import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useState } from 'react'

export function Post({
  title,
  contents,
  author,
  ingredients,
  imageUrl,
  id,
  fullPost = false,
}) {
  const [liked, setLiked] = useState(false)
  const handleLike = async () => {
    if (liked === false) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {imageUrl && (
        <img src={imageUrl} alt={title} style={{ width: 200, height: 150 }} />
      )}
      <div>{contents}</div>
      {ingredients && <div>Ingredients: {ingredients}</div>}
      {author && (
        <em>
          {fullPost && <br />}
          Written by <User {...author} />
        </em>
      )}
      <div>
        <input
          className='styled'
          type='button'
          value={liked ? 'Liked' : 'Like'}
          onClick={handleLike}
        />
      </div>
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  ingredients: PropTypes.string,
  imageUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
