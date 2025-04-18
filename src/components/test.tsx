import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TopicTag {
  name: string;
}

interface QuestionData {
  title: string;
  content: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  topicTags: TopicTag[];
}

const LeetCodeAPI: React.FC = () => {
  const [data, setData] = useState<QuestionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionOfTheDay = async () => {
      try {
        const graphqlQuery = {
          query: `
            query questionData {
              questionOfTheDay {
                title
                content
                difficulty
                likes
                dislikes
                topicTags {
                  name
                }
              }
            }
          `
        };
        
        const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const questionOfTheDay = response.data.data.questionOfTheDay;
        setData(questionOfTheDay);
      } catch (error) {
        console.error('Error fetching Question of the Day:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionOfTheDay();
  }, []);

  if (loading) return <div>Loading Question of the Day...</div>;
  if (!data) return <div>Error loading data.</div>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold">{data.title}</h2>
      <p className="mt-2 text-gray-600">Difficulty: <strong>{data.difficulty}</strong></p>
      <p className="mt-2 text-green-600">👍 {data.likes} | 👎 {data.dislikes}</p>
      <div
        className="mt-4 text-sm text-gray-800"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <div className="mt-4">
        <h3 className="font-semibold">Topics:</h3>
        <ul className="flex flex-wrap gap-2 mt-1">
          {data.topicTags.map((tag, index) => (
            <li key={index} className="px-2 py-1 text-xs bg-gray-200 rounded">
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeetCodeAPI;
