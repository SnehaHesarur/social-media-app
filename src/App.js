import React, { useState, useEffect } from 'react';
import UserProfileView from './user-profile-view/user-profile-view.component'
import PostView from './post-view/post-view.component'
import { fetchUserInfo, fetchPosts } from './data/data.utils';
import CommentsView from './comments-view/comments-view.component';
import moment from 'moment'

function App() {
  const [currentView, setCurrentView] = useState('USER_PROFILE')
  const [postDetails, setPostDetails] = useState()
  const [userinfo, setUserInfo] = useState()
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    const data = fetchUserInfo()
    setUserInfo(data)

    const postsData = fetchPosts()
    setListOfPosts(postsData)
  }, [])

  const handleShowPostView = (post) => {
    if (post && !postDetails) {
      setPostDetails(post)
    }
    setCurrentView('POST_VIEW')
  }

  const handleShowProfileView = () => {
    setPostDetails()
    setCurrentView('USER_PROFILE')
  }

  const handleLikePost = () => {
    setPostDetails({
      ...postDetails,
      likes: postDetails.likes + 1
    })
    const listOfPostsCopy = listOfPosts.map((post) => {
      if (post.id === postDetails.id) {
       return {...post, likes: post.likes + 1}
      }
      return {...post}
    })
    setListOfPosts(listOfPostsCopy)
  }

  const handleShowCommentView = () => {
    setCurrentView('COMMENTS_VIEW')
  }

  const handleAddNewComment = (comment) => {
    const data = {
      comment,
      createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
      commentedBy: {
        username: userinfo.name,
        profilePic: userinfo.profilePic
      },
      likes: 0,
      id: Math.random()
    }
    setPostDetails({
      ...postDetails,
      comments: [...postDetails.comments, data]
    })
    const listOfPostsCopy = listOfPosts.map((post) => {
      if (post.id === postDetails.id) {
       return {
          ...post,
          comments: [...post.comments, data]
        }
      }
      return {...post}
    })
    setListOfPosts(listOfPostsCopy)
  }

  const handleLikeComment = (commentId) => {
    const commentsCopy = postDetails.comments.map((comment) => {
      if (comment.id === commentId) {
        return {...comment, likes: comment.likes + 1}
      }
      return {...comment}
    })
    setPostDetails({...postDetails, comments: commentsCopy})

    const listOfPostsCopy = listOfPosts.map((post) => {
      if (post.id === postDetails.id) {
       return {
          ...post,
          comments: commentsCopy
        }
      }
      return {...post}
    })
    setListOfPosts(listOfPostsCopy)
  }

  return (
    <div className="main-container">
      {
        currentView === 'USER_PROFILE' && userinfo &&
          <UserProfileView listOfPosts={listOfPosts} userinfo={userinfo} handleShowPostViewCallback={handleShowPostView} />
      }
      {
        currentView === 'POST_VIEW' && userinfo &&
          <PostView handleLikeComment={handleLikeComment} handleAddNewComment={handleAddNewComment} handleShowCommentView={handleShowCommentView} handleLikePost={handleLikePost} userinfo={userinfo} postDetails={postDetails} handleShowProfileViewCallback={handleShowProfileView} />
      }
      {
        currentView === 'COMMENTS_VIEW' && userinfo &&
          <CommentsView handleLikeComment={handleLikeComment} handleShowPostViewCallback={handleShowPostView} comments={postDetails.comments || []} handleAddNewComment={handleAddNewComment} />
      }
    </div>
  );
}

export default App;
