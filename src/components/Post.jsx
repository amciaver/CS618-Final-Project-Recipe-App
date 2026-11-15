import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { postTrackEvent } from '../api/events.js'

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
  const [session, setSession] = useState()

  const { data: likeData, refetch: refetchLikes } = useQuery({
    queryKey: ['totalLikes', id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/events/totalLikes/${id}`).then(
        (res) => res.json(),
      ),
  })

  const likeCount = likeData?.likes ?? 0

  const trackEventMutation = useMutation({
    mutationFn: (action) => postTrackEvent({ postId: id, action, session }),
    onSuccess: (data) => {
      if (data?.session) setSession(data.session)
      refetchLikes()
    },
  })

  const handleLike = async () => {
    const action = liked ? 'UNLIKE' : 'LIKE'
    trackEventMutation.mutate(action, {
      onSuccess: () => {
        setLiked(!liked)
      },
    })
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
          disabled={trackEventMutation.isPending}
          value={`${liked ? 'Liked' : 'Like'} (${likeCount})`}
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
