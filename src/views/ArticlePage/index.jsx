import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import ArticleComments from '../../components/Article/comments/'
import { getArticleData, likeArticle, unlikeArticle, BookMark, unBookMark, followUser, unfollowUser } 
from '../../reducers/articlePageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Styles from './index.module.css';
import { CommentOutlined } from '@ant-design/icons'
  
import LikeIcon from '../articles/components/LikeIcon' ; 
import BookMarkIcon from '../articles/components/BookMarkIcon' ; 
import FollowIcon from '../articles/components/FollowIcon' ; 

const ArticlePage = () => {
    var { id } = useParams();
    const dispatch = useDispatch();
   
    const Data = useSelector((state) => state.articlePage);
    const user = useSelector((state)=> state.auth.user) ;  
    var [liked ,setLiked] = useState(Data?.islike) ; 
    var [bookMark , setBookMark] = useState(Data?.isBooked) ; 
    var [follow , setFollow] = useState(Data?.isFollow) ; 
    var [likeCount , setLikeCount] = useState(Data?.length) ; 
    const [commentState, setCommentState] = useState(false);

    const likeThisArticle = () => {

            if (!liked) {
                setLiked(!liked) ; 
                setLikeCount(likeCount +1 ) ; 
                dispatch(likeArticle(id));              
            }
            else {
                setLiked(!liked) ; 
                setLikeCount(likeCount -1 ) ; 
                dispatch(unlikeArticle(id));
            }
    }
    const BookMarkThisArticle = () => {
       
            if (!bookMark) {
                setBookMark(!bookMark)
                dispatch(BookMark(id))
            }
            else {
                setBookMark(!bookMark)
                dispatch(unBookMark(id))
            }
    }
    const followAuthor = () => {
            if (!follow) {
                setFollow(!follow)
                dispatch(followUser(id)) 
            }
            else { 
                setFollow(!follow)
                dispatch(unfollowUser(id))
            }
    }
    useEffect(() => {
        dispatch(getArticleData(id));
    }, [dispatch , id]);
    

    const hidden = (user._id === Data?.myarticle?.authorPersonId._id) ? true : false;
    return (

        <div className={Styles['article-card-container']}>
            <Card
                hoverable
                className="article-card"
                actions={[
                    <LikeIcon likesCount={likeCount} liked={liked} setLiked={likeThisArticle} />,
                    <BookMarkIcon bookMarked={bookMark} setBookMark={BookMarkThisArticle} hidden={hidden} />,
                    <FollowIcon followed={follow} setFollow={followAuthor} hidden={hidden} />,
                    <Comment commentState={commentState} setCommentState={setCommentState} />
                ]}
                bordered={false}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={Data?.myarticle?.authorPersonId?.name}
                    description={Data?.myarticle?.title}
                />
                <Card bordered={false}>
                    {Data?.myarticle?.text}
                </Card>

            </Card>
            <hr className={Styles['Hline']} />

             {(Data?.comments) ?  (<Card bordered={false}>
                <ArticleComments showEditor={commentState} articleId={id} />
            </Card>) :(<Card > there is no comment to show </Card>)}
        </div>


    )
}


const Comment = ({ commentState, setCommentState }) => {
    return (
        <div className={Styles['like-container']} onClick={() => setCommentState(!commentState)}>
            {commentState ? <CommentOutlined style={{ color: '#1890ff' }} /> : <CommentOutlined style={{ color: '#abb2b9 ' }} />}
        </div>
    )
}

export default ArticlePage;

