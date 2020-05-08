import React from 'react'
import thumbnailIcon from '../assets/thumbnail-icon.jpeg'
import listIcon from '../assets/list-icon.png'
import './user-profile-view.component.scss'

function UserProfileView (props) {
  const { handleShowPostViewCallback, userinfo, listOfPosts } = props

  const renderEmptyView = () => {
    return (
      <div className='empty-view'>No Posts</div>
    )
  }

  const renderPostsView = () => {
    return (
      <div className='posts'>
        {
          listOfPosts.map((post, index) => {
            return <div onClick={() => handleShowPostViewCallback(post)} key={index} className='post-thumbnail'><img src={post.postImage} alt='' /></div>
          })
        }
      </div>
    )
  }

  return (
    <div className='user-profile-main-container'>
      <div className='left-container'>
        {
          userinfo &&
            <div className='user-info-container'>
              <img className='user-profile-pic' src={userinfo.profilePic} alt='' />
              <div className='user-name'>{userinfo.name}</div>
              <div className='desc'>{userinfo.description}</div>
            </div>
        }
      </div>
      <div className='posts-main-container'>
        <div className='view-type'>
          <div className='thumbnail'><img className='icon' src={thumbnailIcon} alt='' /></div>
          <div className='list'><img className='icon' src={listIcon} alt='' /></div>
          <div className='tagged-photos'></div>
        </div>
      </div>
      <div className='list-of-posts'>
        {
          listOfPosts.length ? renderPostsView() : renderEmptyView()
        }
      </div>
    </div>
  )
}

export default UserProfileView
