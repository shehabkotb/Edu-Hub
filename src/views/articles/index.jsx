import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React, { useState } from 'react'

import {
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  PlusSquareOutlined,
  MinusSquareOutlined
} from '@ant-design/icons'

import Styles from './index.module.css'

const articleData = [
  {
    id: 1,
    title: 'hazem hamada',
    author: {
      id: 1,
      authorName: 'hazem hamada',
      authorImage:
        'https://images.unsplash.com/photo-1590508292979-a30664cfdb51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    articleBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem deserunt ratione tenetur. Perspiciatis reiciendis commodi corrupti earum exercitationem harum ducimus quas ea laborum enim optio quasi repellat, perferendis rerum quod facilis voluptas sit quae. Tempore iste porro repellendus aliquid perspiciatis! Deleniti aperiam ad porro similique autem qui quod nesciunt quos maxime',
    likesCount: 5,
    articleDate: '2012-04-23T18:25:43.511Z',
    like: true,
    bookMarked: false,
    followingAuthor: true
  },
  {
    id: 2,
    title: 'hazem hamada',
    author: {
      id: 2,
      authorName: 'hazem hamada',
      authorImage:
        'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    },
    articleBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem deserunt ratione tenetur. Perspiciatis reiciendis commodi corrupti earum exercitationem harum ducimus quas ea laborum enim optio quasi repellat, perferendis rerum quod facilis voluptas sit quae. Tempore iste porro repellendus aliquid perspiciatis! Deleniti aperiam ad porro similique autem qui quod nesciunt quos maxime ipsum at minima impedit exercitationem accusantium accusamus sit vitae, debitis dolor. Voluptate earum odio quae sit praesentium, culpa id eum delectus perferendis adipisci ab nemo, expedita ipsa cupiditate cum doloribus sunt nam rerum dicta. Quod, atque optio deserunt odio veniam, vel animi ratione, maiores quaerat voluptatibus dolor culpa?',
    likesCount: 10,
    articleDate: '2012-04-23T18:25:43.511Z',
    like: false,
    bookMarked: true,
    followingAuthor: false
  },
  {
    id: 3,
    title: 'hazem hamada',
    author: {
      id: 3,
      authorName: 'hazem hamada',
      authorImage:
        'https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    articleBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem deserunt ratione tenetur. Perspiciatis reiciendis commodi corrupti earum exercitationem harum ducimus quas ea laborum enim optio quasi repellat, perferendis rerum quod facilis voluptas sit quae. Tempore iste porro repellendus aliquid perspiciatis! Deleniti aperiam ad porro similique autem qui quod nesciunt quos maxime ipsum at minima impedit exercitationem accusantium accusamus sit vitae, debitis dolor. Voluptate earum odio quae sit praesentium, culpa id eum delectus perferendis adipisci ab nemo, expedita ipsa cupiditate cum doloribus sunt nam rerum dicta. Quod, atque optio deserunt odio veniam, vel animi ratione, maiores quaerat voluptatibus dolor culpa?',
    likesCount: 5,
    articleDate: '2012-04-23T18:25:43.511Z',
    like: true,
    bookMarked: false,
    followingAuthor: false
  }
]

const Articles = () => {
  return (
    <div className={Styles['articles-wrapper']}>
      <div className={Styles['article-title-container']}>
        <h2>Articles</h2>
        <div>filter</div>
      </div>
      {articleData.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

const ArticleCard = ({ article }) => {
  // services placed here
  const [liked, setLiked] = useState(article.like)
  const [bookMark, setBookMark] = useState(article.bookMarked)
  const [follow, setFollow] = useState(article.followingAuthor)
  const [likeCount, setLikeCount] = useState(article.likesCount)

  // like mock function
  const likeArticle = (liked) => {
    liked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1)
    setLiked(liked)
  }

  return (
    <div className={Styles['article-card-container']}>
      <Card
        hoverable
        className="article-card"
        actions={[
          <Like likesCount={likeCount} liked={liked} setLiked={likeArticle} />,
          <Bookmark bookMarked={bookMark} setBookMark={setBookMark} />,
          <Follow followed={follow} setFollow={setFollow} />
        ]}
      >
        <Meta
          avatar={<Avatar src={article.author.authorImage} />}
          title={article.title}
          description={article.articleBody}
        />
      </Card>
    </div>
  )
}

const Like = ({ likesCount, liked, setLiked }) => {
  return (
    <div className={Styles['like-container']} onClick={() => setLiked(!liked)}>
      <span className={Styles['likes-count']}>{likesCount}</span>
      {liked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
    </div>
  )
}

const Bookmark = ({ bookMarked, setBookMark }) => {
  return (
    <div
      className={Styles['bookmark-container']}
      onClick={() => setBookMark(!bookMarked)}
    >
      {bookMarked ? (
        <StarFilled style={{ color: '#1890ff' }} />
      ) : (
        <StarOutlined />
      )}
    </div>
  )
}

const Follow = ({ followed, setFollow }) => {
  return (
    <div
      className={Styles['follow-container']}
      onClick={() => setFollow(!followed)}
    >
      {followed ? (
        <>
          <MinusSquareOutlined style={{ marginRight: '8px' }} />
          <span>UnFollow</span>
        </>
      ) : (
        <>
          <PlusSquareOutlined style={{ marginRight: '8px' }} />
          <span>Follow</span>
        </>
      )}
    </div>
  )
}

export default Articles
