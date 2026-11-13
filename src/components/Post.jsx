import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

export function Post({
  title,
  contents,
  author,
  ingredients,
  imageUrl,
  _id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}
      <img src={imageUrl} alt='imageUrl' style={{ width: 200, height: 150 }} />
      <div>{contents}</div>
      {fullPost}
      <div>Ingredients: {ingredients}</div>
      {author && (
        <em>
          {fullPost && <br />}
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  ingredients: PropTypes.string,
  imageUrl: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
