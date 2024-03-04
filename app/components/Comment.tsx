/* eslint-disable react-hooks/exhaustive-deps */
import { IComment } from "../services/articleService";
import { useEffect, useState } from "react";
import { getComment } from "../services/articleService";
import { Button, Card } from "react-bootstrap";
import { CommentsContainer } from "@/containers/CommentsContainer";
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'
import { Interweave } from "interweave";

type ICommentProps = {
  commentId: number;
};

export const Comment = ({ commentId }: ICommentProps) => {
  const [comment, setComment] = useState<IComment | undefined>(undefined);

  const [isOpened, setIsOpened] = useState(false);

  const toggleCheked = () => {
    setIsOpened(!isOpened)
  }

  useEffect(() => {
    getComment(commentId).then(data => setComment(data))
  }, [])

  return (
    <>
      {comment &&
        (<Card className="mt-3">
          <Card.Body>
            <Card.Title>{comment.by}
              {
                isOpened ? (<BsChevronDown fontSize={16} />) : (<BsChevronRight fontSize={16} />)
              }
            </Card.Title>
            <Card.Text>
              <Interweave content={comment.text} />
            </Card.Text>
            <Card.Text>{new Date(comment.time * 1000).toLocaleString('ru-RU')}</Card.Text>
            <span>Ответов: {comment?.kids?.length || 0}</span> <br />
            {
              comment?.kids &&
              comment?.kids.length > 0 && (
                <Button onClick={toggleCheked}
                  size="sm"
                  variant="dark"
                  className="mt-2"
                >
                  {
                    isOpened ? 'Скрыть ответы' : 'Показать ответы'
                  }
                </Button>)
            }
          </Card.Body>
          {
            isOpened
            && comment?.kids
            && (
              <div className="mx-5">
                <CommentsContainer commentIds={comment.kids} />
              </div>
            )
          }
        </Card>)
      }
    </>
  )
}