import { Card, Button, Modal, Form, Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { create_article, getAllArticles, deleteArticle } from '../../reducers/articlesReducer';
import { getArticleData, likeArticle, unlikeArticle, BookMark, unBookMark, followUser, unfollowUser } from '../../reducers/articlePageReducer';

import {
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  PlusSquareOutlined,
  MinusSquareOutlined,
  MinusCircleFilled,
  MinusSquareFilled,
  MinusCircleOutlined,
  DeleteFilled
} from '@ant-design/icons'


import Styles from './index.module.css'

const { TextArea } = Input;


const Articles = () => {
  let dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm()
  const handleCancel = () => {
    setModalVisible(false)
  }



  const onFinish = (values) => {
    let Article = {
      "text": values.articleBody,
      "title": values.articleTitle,
      "url": values.url
    };


    try {
      dispatch(create_article(Article));
      setModalVisible(false);

    } catch (e) {
      console.log('can\'t Create Article');
    }
  };

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch, onFinish]);

  useEffect(() => {
    const deleteArticle = (id) => { return dispatch(deleteArticle(id)) }

  }, [dispatch])



  let articleData = useSelector((state) => state.articles)

  function handleClick() {
    setModalVisible(true);
  }

  return (
    <div className={Styles['articles-wrapper']}>
      <div className={Styles['article-title-container']}>
        <h2>Articles</h2>
        <div className={Styles['article-title-container']}>

          <Button type="primary" onClick={handleClick}>
            New Article
          </Button>

          <Modal
            title="Add New Article"
            visible={modalVisible}
            onOk={form.submit}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
             </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Submit
             </Button>
            ]}
          >
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="articleTitle"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Article Title!',
                  },
                ]}
              >
                <Input type="text" placeholder="ArticleTitle" />
              </Form.Item>
              <Form.Item
                name="articleBody"
                rules={[
                  {
                    required: true,
                    message: 'Please input your article body!',
                  },
                ]}
              >
                <TextArea
                  type="text"
                  placeholder="article body"
                  autoSize={{ minRows: 5, maxRows: 6 }}

                />
              </Form.Item>
              <Form.Item
                name="url"

              >
                <Input type="text" placeholder="article url" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      {articleData.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          deleteArticle={deleteArticle(article.id)}
        />
      ))}
    </div>
  )
}

const ArticleCard = ({ article, deleteArticle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickDelete = () => {
    deleteArticle(article.id)
  }


  const viewArticle = () => {
    history.push(`/app/articlePage/${article.id}`)
  }
  const user = useSelector((state) => state.auth.user) ; 
  useEffect(() => {
    dispatch(getArticleData(article.id));
  }, [dispatch]);
  const Data = useSelector((state) => state.articlePage);

  const [liked, setLiked] = useState(Data.likedBy.my_like);
  const [bookMark, setBookMark] = useState(Data.isbooked.data.isbook);
  const [follow, setFollow] = useState(Data.isfollow.data.myfollow);
  const [likeCount, setLikeCount] = useState(Data.likedBy.length);


  // like mock function
  const likeThisArticle = () => {

    setTimeout(() => {
        if (!liked) {
            dispatch(likeArticle(article.id));
            setLiked(!liked);
            setLikeCount(likeCount + 1);
        }
        else {
            dispatch(unlikeArticle(article.id));
            setLiked(!liked)
            setLikeCount(likeCount - 1)
        }
    }, 1000)
}


const BookMarkThisArticle = () => {
    setTimeout(() => {
        if (!bookMark) {
            dispatch(BookMark(article.id))
            setBookMark(!bookMark);

        }
        else {
            dispatch(unBookMark(article.id))
            setBookMark(!bookMark);

        }
    }, 1000)
}

const followAuthor = () => {
    setTimeout(() => {

        if (!follow) {
            dispatch(followUser(article.id))
            setFollow(!follow)
        }
        else {
            dispatch(unfollowUser(article.id))
            setFollow(!follow)
        }

    }, 1000)
}
const hidden = (user._id === article.authorPersonId._id) ? true : false;

  return (
    <div className={Styles['article-card-container']}>
      <Card
        hoverable
        className="article-card"
        actions={[
          <Like likesCount={likeCount} liked={liked} setLiked={likeThisArticle} />,
          <Bookmark bookMarked={bookMark} setBookMark={BookMarkThisArticle} hidden={hidden} />,
          <Follow followed={follow} setFollow={followAuthor} hidden={hidden} />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={article.authorPersonId.name}
          description={article.title}
        />

        <p>
          {article.text}
        </p>
        {user && user._id === article.authorPersonId._id && (<Button type="icon" className={Styles['iconButton']}
          onClick={clickDelete}
        >
          <DeleteFilled />
        </Button>)}
        <Button type="text" onClick={viewArticle} className={Styles['viewButton']} > view </Button>

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

const Bookmark = ({ bookMarked, setBookMark, hidden }) => {
  return (
      <>
          {hidden ? (<div> <MinusCircleFilled />  <StarOutlined /></div>) : (<div
              className={Styles['bookmark-container']}
              onClick={() => setBookMark(!bookMarked)}
          >
              {bookMarked ? (
                  <StarFilled style={{ color: '#1890ff' }} />
              ) : (
                  <StarOutlined />
              )}
          </div>)}
      </>
  )
}

const Follow = ({ followed, setFollow, hidden }) => {
  return (
      <>
          {hidden ? (<div>
              <MinusSquareFilled />
              <MinusCircleOutlined style={{ marginRight: '8px' }} />
          </div>) :
              (<div
                  className={Styles['follow-container']}
                  onClick={() => setFollow(!followed)}
              >
                  {followed ? (
                      <>
                          <MinusSquareOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                          <span style={{ color: '#1890ff' }}>UnFollow</span>
                      </>
                  ) : (
                      <>
                          <PlusSquareOutlined style={{ marginRight: '8px' }} />
                          <span>Follow</span>
                      </>
                  )}
              </div>)}
      </>
  )
}

export default Articles
