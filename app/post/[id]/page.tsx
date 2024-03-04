/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, Card, Col, Spinner, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IArticle, getStory } from "@/app/services/articleService";
import Link from "next/link";
import { CommentsContainer } from "@/containers/CommentsContainer";
import useInterval from "@/app/hooks/useInterval";

export type IPostProps = {
  params: {
    id: number;
  }
}

function Post({ params: { id } }: IPostProps) {
  const [story, setStory] = useState<IArticle | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);


  const fetchStory = async () => {
    try {
      setIsLoading(true);
      const storyData = await getStory(id);
      setStory(storyData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStory();
  }, []);

  useInterval(() => {
    fetchStory()
  }, 1000 * 60)

  return (
    <div className="mt-3">
      <Link href='/' className="mt-3 d-block">Назад</Link>
      {
        story ? (
          <Col key={story.id} className="mt-3">
            <Card>
              <Card.Header>
                <Card.Title>
                  {story.title}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Рейтинг: {story.score}</Card.Text>
                <Card.Text>Дата: {new Date(story.time * 1000).toLocaleString('ru-RU')}</Card.Text>
                <Card.Text>Автор: {story.by}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <a href={story.url} target='_blank'>{story.url}</a>
              </Card.Footer>
            </Card>
          </Col>
        ) : null
      }
      {
        story?.kids ? (
          <div>
            <Stack direction="horizontal" gap={2} className="justify-content-between">
              <h2 className="h5 mt-3">
                Комментарии({story.kids.length})
              </h2>
                <Button
                  size="sm"
                  onClick={fetchStory}
                  variant='dark'
                >
                  {isLoading && (<Spinner
                    size="sm"
                    animation='grow'
                    className="mx-1" />)
                  }
                  Обновить комментарии
                </Button>
            </Stack>
            <CommentsContainer commentIds={story.kids} />
          </div>
        ) : null
      }
    </div>
  )
}

export default Post;