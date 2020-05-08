import React from 'react'
import './post-view.component.scss'
import likeIcon from '../assets/like.png'
import commentIcon from '../assets/comment.png'
import CommentsView from '../comments-view/comments-view.component'

function PostView (props) {
  const {
    postDetails,
    handleShowCommentView,
    handleShowProfileViewCallback,
    userinfo,
    handleLikePost,
    handleLikeComment,
    handleAddNewComment
  } = props

  const getPostComments = () => {
    if (postDetails.comments.length > 3) {
      return postDetails.comments.slice(postDetails.comments.length - 3, postDetails.comments.length)
    }
    return postDetails.comments || []
  }

  return (
    <div className='post-details-main-container'>
      <div className='header'>
        <span onClick={handleShowProfileViewCallback} className='back'>{'<--- Back'}</span>
      </div>
      <div className='post-details-container'>
        <div className='posted-by-info'>
          <img className='posted-by-user-icon' src={userinfo.profilePic} alt='' />
          <div className='posted-by-user'>{userinfo.name}</div>
        </div>
        <div className='img-container'>
          <img className='post-img' alt='' src={postDetails.postImage} />
        </div>
        <div className='like-comment-icons-container'>
          <img onClick={handleLikePost} src={likeIcon} alt='' className='like-btn' />
          <img onClick={handleShowCommentView} src={commentIcon} alt='' className='comment-btn' />
        </div>
        {
          postDetails.likes > 0 &&
            <div className='likes-info'>{`Liked by ${postDetails.likes}`}</div>
        }
        <div className='description'>{postDetails.description}</div>
        {
          postDetails.comments.length > 3
            ? <div className='load-more' onClick={handleShowCommentView}>{`View all ${postDetails.comments.length} comments`}</div>
            : ''
        }
        <CommentsView isPostView handleLikeComment={handleLikeComment} comments={getPostComments()} handleAddNewComment={handleAddNewComment} />
      </div>
    </div>
  )
}

export default PostView
