import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React from 'react'

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
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem deserunt ratione tenetur. Perspiciatis reiciendis commodi corrupti earum exercitationem harum ducimus quas ea laborum enim optio quasi repellat, perferendis rerum quod facilis voluptas sit quae. Tempore iste porro repellendus aliquid perspiciatis! Deleniti aperiam ad porro similique autem qui quod nesciunt quos maxime ipsum at minima impedit exercitationem accusantium accusamus sit vitae, debitis dolor. Voluptate earum odio quae sit praesentium, culpa id eum delectus perferendis adipisci ab nemo, expedita ipsa cupiditate cum doloribus sunt nam rerum dicta. Quod, atque optio deserunt odio veniam, vel animi ratione, maiores quaerat voluptatibus dolor culpa?',
    likesCount: 5,
    articleDate: '2012-04-23T18:25:43.511Z',
    like: false,
    bookMarked: false,
    followingAuthor: false
  }
]

const Articles = () => {
  // send methods lel api hena
  return (
    <div>
      <div className="article-title-container">
        <h2>Articles</h2>
        <div>filter</div>
      </div>
      <ArticleCard article={articleData[0]} />
    </div>
  )
}

const ArticleCard = ({ article }) => {
  //set methods lel state
  return (
    <div className="article-card-container">
      <Card
        className="article-card"
        actions={[
          <ArticleActions
            likesCount={article.likesCount}
            liked={article.like}
            bookMarked={article.bookMarked}
            followed={article.followingAuthor}
          />
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

const ArticleActions = ({ liked, likesCount, bookMarked, followed }) => {
  return (
    <div className="article-actions-container">
      <div>
        <Like likesCount={likesCount} liked={liked} />
      </div>
      <div>
        <Bookmark bookMarked={bookMarked} />
      </div>
      <div>
        <Follow followed={followed} />
      </div>
    </div>
  )
}

const Like = ({ likesCount, liked }) => {
  return <div>likes</div>
}

const Bookmark = ({ bookMarked }) => {
  return <div>Bookmark</div>
}

const Follow = ({ followed }) => {
  return <div>Follow</div>
}

export default Articles
