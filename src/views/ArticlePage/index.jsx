import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import ArticleComments from '../../components/Article/comments/'
import { LikeOutlined, LikeFilled, MinusSquareFilled, StarOutlined, MinusCircleOutlined, MinusCircleFilled, StarFilled, PlusSquareOutlined, MinusSquareOutlined, CommentOutlined } from '@ant-design/icons'
import { getArticleData, likeArticle, unlikeArticle, BookMark, unBookMark, followUser, unfollowUser } from '../../reducers/articlePageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Styles from './index.module.css'

const ArticlePage = () => {
    var { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticleData(id));
    }, [dispatch , id]);

    const Data = useSelector((state) => state.articlePage);
    const myarticle = Data.myarticle;

    const user = useSelector((state) => state.auth.user)


    const [liked, setLiked] = useState(Data.likedBy.my_like);
    const [bookMark, setBookMark] = useState(Data.isbooked.data.isbook);
    const [follow, setFollow] = useState(Data.isfollow.data.myfollow);
    const [likeCount, setLikeCount] = useState(Data.likedBy.length);
    const [commentState, setCommentState] = useState(false);

    const likeThisArticle = () => {

        setTimeout(() => {
            if (!liked) {
                dispatch(likeArticle(id));
                setLiked(!liked);
                setLikeCount(likeCount + 1);
            }
            else {
                dispatch(unlikeArticle(id));
                setLiked(!liked)
                setLikeCount(likeCount - 1)
            }
        }, 1000)
    }


    const BookMarkThisArticle = () => {
        setTimeout(() => {
            if (!bookMark) {
                dispatch(BookMark(id))
                setBookMark(!bookMark);

            }
            else {
                dispatch(unBookMark(id))
                setBookMark(!bookMark);

            }
        }, 1000)
    }

    const followAuthor = () => {
        setTimeout(() => {

            if (!follow) {
                dispatch(followUser(id))
                setFollow(!follow)
            }
            else {
                dispatch(unfollowUser(id))
                setFollow(!follow)
            }

        }, 1000)
    }

    const hidden = (user._id === myarticle.authorPersonId._id) ? true : false;
    return (

        <div className={Styles['article-card-container']}>
            <Card
                hoverable
                className="article-card"
                actions={[
                    <Like likesCount={likeCount} liked={liked} setLiked={likeThisArticle} />,
                    <Bookmark bookMarked={bookMark} setBookMark={BookMarkThisArticle} hidden={hidden} />,
                    <Follow followed={follow} setFollow={followAuthor} hidden={hidden} />,
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
                <ArticleComments showEditor={commentState} articleId={id} />
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





export default ArticlePage;

