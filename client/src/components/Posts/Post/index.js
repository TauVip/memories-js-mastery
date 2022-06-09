import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import {
  Delete,
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined
} from '@material-ui/icons'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, getPosts, likePost } from '../../../actions/posts'
import useStyles from './styles'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  const [likes, setLikes] = useState(post?.likes)

  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = post.likes.find(like => like === userId)

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) setLikes(post.likes.filter(id => id !== userId))
    else setLikes([...post.likes, userId])
  }

  const Likes = () => {
    if (likes.length > 0)
      return likes.find(like => like === userId) ? (
        <>
          <ThumbUpAlt fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    )
  }

  const openPost = () => {
    setCurrentId(post._id)
    navigate(`/posts/${post._id}`)
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <div
              style={{ color: 'white' }}
              size='small'
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHoriz fontSize='medium' />
            </div>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map(tag => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              await dispatch(deletePost(post._id))
              dispatch(getPosts(1))
            }}
          >
            <Delete fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
export default Post
