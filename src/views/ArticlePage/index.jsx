import React, { useState, useEffect, useCallback } from 'react'
import { Card, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import ArticleComments from '../../components/Article/comments/'
import { LikeOutlined, LikeFilled, StarOutlined, StarFilled, PlusSquareOutlined, DeleteFilled, MinusSquareOutlined, CommentOutlined } from '@ant-design/icons'
import { getArticleData ,likeArticle ,unlikeArticle , BookMark ,unBookMark , followUser , unfollowUser} from '../../reducers/articlePageReducer';
import { deleteArticle } from '../../reducers/articlesReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Styles from './index.module.css'


const article = {
    id: 1,
    title: 'hazem hamada',
    author: {
        id: 1,
        authorName: 'hazem hamada',
        authorImage:
            'https://images.unsplash.com/photo-1590508292979-a30664cfdb51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem deserunt ratione tenetur. Perspiciatis reiciendis commodi corrupti earum exercitationem harum ducimus quas ea laborum enim optio quasi repellat, perferendis rerum quod facilis voluptas sit quae. Tempore iste porro repellendus aliquid perspiciatis! Deleniti aperiam ad porro similique autem qui quod nesciunt quos maxime',
    title: 'Lorem ipsum dolor',
    likesCount: 5,
    like: true,
    bookMarked: false,
    followingAuthor: true
};


const ArticlePage = () => {
    // services placed here
    var { id } = useParams();


    const clickDelete = () => {
        deleteArticle(id)
    }

    const user = useSelector((state) => state.auth.user) ; 
    console.log(user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticleData(id));

    }, [dispatch]);
    
    const Data = useSelector((state) => state.articlePage);

    const myarticle = Data.myarticle;
    console.log(Data)
    console.log(Data.likedBy.length , Data.isfollow.data.myfollow, Data.isbooked.data.isbook);
    const [liked, setLiked] = useState(Data.likedBy.my_like);
    const [bookMark, setBookMark] = useState(Data.isbooked.isbook);
    const [follow, setFollow] = useState(Data.isfollow.myfollow);
    const [likeCount, setLikeCount] = useState(Data.likedBy.length);
    const [commentState, setCommentState] = useState(false);

    const likeThisArticle = () => {
        if(!liked)
        {
            dispatch(likeArticle(id)) ; 
            setLiked(!liked) ; 
            setLikeCount(likeCount+1) ; 
        }
        else 
        {
            dispatch(unlikeArticle(id)); 
            setLiked(!liked)
            setLikeCount(likeCount-1)
        }
    }


    const BookMarkThisArticle = () =>{
        if(!bookMark)
        {
            dispatch(BookMark(id))
            setBookMark(!bookMark) ; 

        }
        else
        {
            dispatch(unBookMark(id))
            setBookMark(!bookMark) ; 
            
        }
    }

    const followAuthor = ()=>{
        if(!follow)
        {
            dispatch(followUser(id))
            setFollow(!follow)
        }
        else{
            dispatch(unfollowUser(id))
            setFollow(!follow)
        }
    }
    return (

        <div className={Styles['article-card-container']}>
            <Card
                hoverable
                className="article-card"
                actions={[
                    <Like likesCount={likeCount} liked={liked} setLiked={likeThisArticle} />,
                    <Bookmark bookMarked={bookMark} setBookMark={BookMarkThisArticle} />,
                    <Follow followed={follow} setFollow={followAuthor} />,
                    <Comment commentState={commentState} setCommentState={setCommentState} />
                ]}
                bordered={false}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={myarticle.authorPersonId.name}
                description={myarticle.title}
                />
                <Card bordered={false}>
                    {myarticle.text}
                </Card>
              
            </Card>
            <hr className={Styles['Hline']} />

            <Card bordered={false}>
                <ArticleComments showEditor={commentState} />
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


const Comment = ({ commentState, setCommentState }) => {
    return (
        <div className={Styles['like-container']} onClick={() => setCommentState(!commentState)}>
            {commentState ? <CommentOutlined style={{ color: '#1890ff' }} /> : <CommentOutlined style={{ color: '#abb2b9 ' }} />}
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
                    <MinusSquareOutlined style={{ marginRight: '8px' , color: '#1890ff' }} />
                    <span style={{ color: '#1890ff'}}>UnFollow</span>
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





export default ArticlePage;

