import React, { useState, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [pivotTime, setPivotTime] = useState(Date.now())
  const [limit, setLimit] = useState(3)

  useEffect(() => {
    subscribeToNewFeedPosts(pivotTime, newPosts => {
      setNewPosts(newPosts.contact(post))
      setNewPosts([])
      setLimit(limit + newPosts.lenght)
    })
  }, [pivotTime])
  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(pivotTime, limit).then(posts => {
      if (isCurrent) setPosts(posts)
    })

    return () => (isCurrent = false)
  }, [pivotTime, limit])
  const handleViewNewPosts = () => {
    setPivotTime(Date.now())
  }

  const handleViewMore = () => {
    setLimit(limit + 3)
  }

  return (
    <div className="Feed">
      {newPosts.lenght && (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={() => handleViewNewPosts}
          >
            View {newPosts.lenght} New Posts
          </button>
        </div>
      )}
      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  )
}

// // you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
// }
