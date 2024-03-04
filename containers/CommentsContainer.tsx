import { Comment } from '@/app/components/Comment';

type ICommentsContainerProps = {
  commentIds: number[]
}
export const CommentsContainer = ({commentIds}: ICommentsContainerProps) => {
  
  return commentIds.map((commentId: any) => <Comment commentId={commentId} key={commentId}/>)

}
