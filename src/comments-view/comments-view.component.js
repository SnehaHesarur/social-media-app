import React, { useState, useEffect } from 'react'
import likeIcon from '../assets/like.png'
import enterIcon from '../assets/enter.svg'
import './comments-view.component.scss'
import { getDatePassedFromToday } from '../utils/date.utils'

function CommentsView (props) {
  const { isPostView, comments, handleShowPostViewCallback, handleAddNewComment, handleLikeComment } = props
  const [inputValue, setInputValue] = useState('')

  const handleOnChange = (e) => {
    setInputValue(e.target.value || '')
  }

  const handleSubmit = () => {
    handleAddNewComment(inputValue)
    setInputValue('')
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13 && inputValue) {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (!isPostView) {
      const element = document.getElementById('comments-input')
      if (element) {
        element.focus()
      }
    }
  }, [])

  return (
    <div className='comment-details-main-container'>
      {
        !isPostView &&
          <div className='header'>
            <span onClick={handleShowPostViewCallback} className='back'>{'<--- Back'}</span>
            <span className='header-text'>Comments</span>
          </div>
      }
      <div className='comment-details-container'>
        {
          comments.map((comment, index) => {
            return (
              <div key={index} className='comment-wrapper'>
                <div className='user-icon'>
                  <img className='user-icon-img' src={comment.commentedBy.profilePic} alt='' />
                </div>
                <div className='comment-content'>
                  <div className='comment-info-detailed-wrapper'>
                    <div className='comment'>
                      <span className='name'>{comment.commentedBy.username}</span>
                      <span className='desc'>{comment.comment}</span>
                    </div>
                    <div className='comment-stats'>
                      <div className='date-stamp'>{getDatePassedFromToday(comment.createdAt)}</div>
                      {
                        comment.likes > 0 &&
                        <div className='likes-info'>{`${comment.likes} like/s`}</div>
                      }
                    </div>
                  </div>
                  <div className='like-wrapper'>
                    <img onClick={() => handleLikeComment(comment.id)} className='comment-like' src={likeIcon} alt='' />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        !isPostView &&
          <div className='comment-input-container'>
            <input id='comments-input' onKeyUp={handleEnter} className='comment-input' value={inputValue} placeholder='Add comments' onChange={handleOnChange} />
            <div className='submit-wrapper' onClick={handleSubmit}>
              <img src={enterIcon} alt='' className='enter-img' />
            </div>
          </div>
      }
    </div>
  )
}

export default CommentsView
