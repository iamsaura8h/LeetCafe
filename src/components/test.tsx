
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface TopicTag {
  name: string;
  id?: string;
  slug?: string;
}

interface DailyQuestion {
  date: string;
  link: string;
  question: {
    titleSlug: string;
    title: string;
    difficulty: string;
    frontendQuestionId: string;
  }
}

interface QuestionDetails {
  title: string;
  content: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  topicTags: TopicTag[];
}

const LeetCodeAPI: React.FC = () => {
  const [dailyQuestion, setDailyQuestion] = useState<DailyQuestion | null>(null);
  const [questionDetails, setQuestionDetails] = useState<QuestionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        // First query to get daily challenge
        const dailyQuery = {
          query: `
            query questionOfToday {
              activeDailyCodingChallengeQuestion {
                date
                link
                question {
                  titleSlug
                  title
                  difficulty
                  frontendQuestionId
                }
              }
            }
          `,
          variables: {},
          operationName: "questionOfToday"
        };

        const dailyResponse = await axios.post('https://leetcode.com/graphql', dailyQuery);
        const dailyData = dailyResponse.data.data.activeDailyCodingChallengeQuestion;
        setDailyQuestion(dailyData);

        // Second query to get question details
        const detailsQuery = {
          operationName: "questionData",
          query: `query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
              title
              content
              difficulty
              likes
              dislikes
              topicTags {
                name
              }
            }
          }`,
          variables: { titleSlug: dailyData.question.titleSlug }
        };

        const detailsResponse = await axios.post('https://leetcode.com/graphql', detailsQuery);
        setQuestionDetails(detailsResponse.data.data.question);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch the challenge. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyChallenge();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-[200px]">Loading Question of the Day...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!dailyQuestion || !questionDetails) return <div>No challenge data available.</div>;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-mono">
              {dailyQuestion.question.frontendQuestionId}. {questionDetails.title}
            </CardTitle>
            <CardDescription>
              Posted on {new Date(dailyQuestion.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getDifficultyColor(questionDetails.difficulty)}>
            {questionDetails.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div 
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: questionDetails.content }}
        />
        
        <div className="flex gap-2 flex-wrap mt-4">
          {questionDetails.topicTags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="text-green-600">👍 {questionDetails.likes}</span>
          <span className="text-red-600">👎 {questionDetails.dislikes}</span>
        </div>
      </CardContent>

      <CardFooter>
        <a 
          href={`https://leetcode.com${dailyQuestion.link}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="flex items-center gap-2">
            Solve on LeetCode
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default LeetCodeAPI;
