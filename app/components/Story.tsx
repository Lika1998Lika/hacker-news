/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IArticle, getStory } from '../services/articleService';
import { Card, Col } from 'react-bootstrap';
import Link from 'next/link';

export const Story = ({storyId}: any) => {
  const [story, setStory] = useState<IArticle | undefined>(undefined)

  useEffect(() => {
    getStory(storyId).then(data => setStory(data))
  }, []);

  return story ? (
          <Col key={story.id}>
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
                <a href={story.url} target='_blank'>{story.url}</a>
              </Card.Body>
              <Card.Footer>
                <Link href={`/post/` + story.id}>Подробнее...</Link>
              </Card.Footer>
            </Card>
          </Col>
        ) : null
};
