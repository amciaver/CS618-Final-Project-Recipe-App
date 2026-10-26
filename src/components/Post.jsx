import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Post({ title, contents, author, ingredients, imageUrl }) {
  return (
    <article>
      <h3>{title}</h3>

      <img src={imageUrl} alt='imageUrl' style={{ width: 200, height: 150 }} />
      <div>{contents}</div>
      <div>Ingredients: {ingredients}</div>
      {author && (
        <em>
          <br />
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
}
