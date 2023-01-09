import axios from 'axios';
import { getAuthHeader } from './config';

const baseURL = '/article'

const timeline  = async (page,limit) => {
  const response = await axios.get(`${baseURL}/timeline?page=${page}&limit=${limit}` , getAuthHeader()) ; 
  return response.data
}
const myArticles = async (userName) => {
  const response = await axios.get(
    `${baseURL}/${userName}/articles`,
    getAuthHeader()
  )
  return response.data
}
const create_article = async (article) => {
  const response = await axios.post(`${baseURL}/newArticle`, article, getAuthHeader()) ; 
  return response.data
}

const getThisArticle = async (articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}` ,getAuthHeader() ) ; 
  return response.data ; 
}

const getAllArticles  = async () => {
  const response = await axios.get(`${baseURL}/getAllArticles` ,getAuthHeader()) ; 
  return response.data
}

const getArticleOfUser = async (username)=>{
  const response = await axios.get(`${baseURL}/${username}/articles` , getAuthHeader()) ; 
  return response.data ; 
}

const deleteArticle = async (articleId) =>{
  const response = await axios.delete(`${baseURL}/deleteArticle/${articleId}` , getAuthHeader())  ;  
  return response.data
}

/*  like section */
const getlikedBy = async (articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/likeBy` ) ; 
  return response.data ; 
}

const likeArticle = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/like` , getAuthHeader()) ; 
  return response.data ; 
}

const UnlikeArticle = async(articleId)=>{
  const response = await axios.delete(`${baseURL}/${articleId}/unlike` , getAuthHeader()) ; 
  return response.data ; 
}

/*  bookmark section */

const unBookMark = async(articleId)=>{
  const response = await axios.delete(`${baseURL}/${articleId}/unbookMarked` , getAuthHeader()) ; 
  return response.data ; 
}

const BookMark = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/bookMarked` , getAuthHeader()) ; 
  return response.data; 

}

const myBookMarks = async()=>{
  const response = await axios.get(`${baseURL}/myBookedMarks` , getAuthHeader()) ; 
  return response.data; 

}

const isBooked = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/isBooked`)
  return response ; 
}

/*  follows section */
const followUser = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/followUser` , getAuthHeader()) ; 
  return response.data; 

}

const unfollow = async(articleId)=>{
  const response = await axios.delete(`${baseURL}/${articleId}/unfollow` , getAuthHeader()) ; 
  return response.data; 

}


const isfollow = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/isfollow`)
  return response ; 
}

const myfollowers = async(username)=>{
  const response = await axios.get(`${baseURL}/${username}/followers` , getAuthHeader()) ; 
  return response.data ; 
}



const follows = async(username)=>{
  const response = await axios.get(`${baseURL}/${username}/follows` , getAuthHeader());
  return response.data ; 
}

/* comments section */
const getComments = async(articleId)=>{
  const response = await axios.get(`${baseURL}/${articleId}/comments`) ;
  return response.data ;  
}

const createComment = async(articleId , comment)=>{
  const response = await axios.post(`${baseURL}/${articleId}/addcomment`, comment , getAuthHeader()) ;
  return response.data ;  
}

const deleteComment = async (articleId , commentId)=>{
  const response = await axios.delete(`${baseURL}/${articleId}/delete/${commentId}` , getAuthHeader()) 
  return response.data ; 
}



const articleService = {
  myBookMarks,
  followUser,
  unfollow,
  myfollowers,
  follows,
  getComments,
  createComment,
  deleteComment,
  timeline,
  create_article,
  getThisArticle,
  getlikedBy,
  likeArticle,
  UnlikeArticle,
  unBookMark,
  BookMark,
  getAllArticles,
  getArticleOfUser,
  isBooked,
  isfollow,
  deleteArticle,
  myArticles
} ; 



export default articleService
