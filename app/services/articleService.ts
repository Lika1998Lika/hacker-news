'use service'
import Axios from 'axios';
export type IArticle = {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string; 
  type: 'story';
  url: string;
  kids: number[];
 }


 export type IComment = {
  by: string;
  id: number;
  kids:number[];
  parent: number;
  text: string;
  time: number;
  type: 'comment';
 }

 export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
 export const ARTICLES_URL = `${BASE_URL}newstories.json`;
 export const ARTICLE_URL =  `${BASE_URL}item/`
  
 export const getStory = async (storyId: number) => {
  const response = await Axios.get<IArticle>(`${ARTICLE_URL + storyId}.json`)
  .then(({data}) => data)
  return response
}
  export const getStoryIds = async () => {
  const response = await Axios.get(ARTICLES_URL)
  .then(({data}) => data)
  return response.slice(0, 100)
}

export const getComment = async (commentId: number) => {
  const response = await Axios.get<IComment>(`${ARTICLE_URL + commentId}.json`)
  .then(({data}) => data)
  return response
}

