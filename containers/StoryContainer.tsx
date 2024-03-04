import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../app/services/articleService';
import { Story } from '@/app/components/Story';
import useInterval from '@/app/hooks/useInterval';
import { Button, Spinner } from 'react-bootstrap';

export const StoryContainer = () => {
  const [storyIds, setStoryIds] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStoryIds = async () => {
    try {
      setIsLoading(true);
      const ids = await getStoryIds();
      setStoryIds(ids);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    fetchStoryIds(); 
  }, []);

  useInterval(() => {
    fetchStoryIds()
  }, 1000 * 60);

  return (
    <div>
      <div className='d-flex'>
        <Button 
          onClick={fetchStoryIds} 
          variant='dark' 
          className='mx-auto' 
          >
            {isLoading && (<Spinner size='sm' animation='grow' className='mx-1'/>)}
            Reload
          </Button>
      </div>
      {
        storyIds?.map((id) => {
         return <div className='mt-3' key={id}>
            <Story storyId={id} />
          </div>
        })
      }
    </div>
  )
};
