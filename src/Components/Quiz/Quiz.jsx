import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import "./Quiz.css";
import quizQuestion from "../../Question";
import PrimaryButton from "../PrimaryButton";

const Quiz = () => {
  const [quizScreen, setQuizScreen] = useState("Start Quiz");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState(0);
  const [expectedAnswers, setExpectedAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const timer = useRef(null);
  const progressBar = useRef(null);

  const handleNextQuestion = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const { question, expectedAnswer } = quizQuestion.getQuestion();
    const questionList = [...questions, question];
    const expectedAnswerList = [...expectedAnswers, expectedAnswer];
    setQuizScreen("Show Question");
    setQuestion(question);
    setExpectedAnswer(expectedAnswer);
    setExpectedAnswers(expectedAnswerList);
    setQuestions(questionList);
  };

  useEffect(()=>{
    if(questions.length>0){
      progressBar.current.classList.remove("active");
      setTimeout(()=>{
          progressBar.current.classList.add("active");
      },0);
      timer.current = setTimeout(handleNextQuestion,10*1000);
    }
  },[question]);

  const handleSubmit = () => {
    setQuizScreen("Show Answers");
    progressBar.current.classList.remove("active");
  };

  const Question = () => {
    let count = questions.length;
    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
      setAnswer(e.target.value);
    };

    const handleSubmitQuestion = () => {
      let score = totalScore;
      if (parseFloat(answer) === expectedAnswer) {
        score = score + 1;
      }
      setAnswers([...answers, answer]);
      setTotalScore(score);
    };

    const handleResetQuiz = () => {
      setQuizScreen("Start Quiz");
      setQuestions([]);
      setAnswers([]);
      setExpectedAnswers([]);
      setTotalScore(0);
    };

    return (
      <div>
        <div style={{ display: "flex" }}>
          <div className="content">Ques-{`${count}: `}</div>
          <div
            style={{ display: "inline", marginLeft: "2px", fontSize: "15px" }}
          >
            {question}
          </div>
        </div>
        <div className="answer-container">Ans-{`${count}:`}</div>
        <div style={{ margin: "4% 0px" }}>
          <TextField
            required
            label="Answer"
            type="text"
            value={answer}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <PrimaryButton
            value="Submit Ans"
            handler={handleSubmitQuestion}
            type="contained"
            color="primary"
            size="small"
          />
          {questions.length < 20 ? (
            <PrimaryButton
              value="Next"
              handler={handleNextQuestion}
              type="contained"
              color="primary"
              size="small"
            />
          ) : (
            <PrimaryButton
              value="Submit Quiz"
              handler={handleSubmit}
              type="contained"
              color="secondary"
              size="small"
            />
          )}
        </div>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <div className="score">Score-{totalScore}</div>
          <PrimaryButton
            value="Reset Quiz"
            handler={handleResetQuiz}
            type="contained"
            color="success"
            size="small"
          />
        </div>
      </div>
    );
  };

  const Solution = () => {
    const handleScoreCard = () => {
      setQuizScreen("Start Quiz");
      setQuestions([]);
      setAnswers([]);
      setExpectedAnswers([]);
      setTotalScore(0);
    };

    return (
      <div>
        Score: {totalScore} out of {questions.length}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Given Answer</TableCell>
              <TableCell>Correct Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow
                style={{
                  backgroundColor:
                    parseFloat(answers[index]) !== expectedAnswers[index]
                      ? "red"
                      : "none",
                }}
                key={index}
              >
                <TableCell>{question}</TableCell>
                <TableCell>{answers[index]}</TableCell>
                <TableCell>{expectedAnswers[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PrimaryButton
          value="Close"
          handler={handleScoreCard}
          type="contained"
          color="secondary"
          size="small"
        />
      </div>
    );
  };

  return (
    <div
      className="container"
    >
      <Card style={{margin:"100px"}}>
        <CardContent>
          <div className="progress-bar" ref={progressBar} />
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {quizScreen === "Start Quiz" && (
              <>
                <Typography gutterBottom>Please Start the Quiz</Typography>
                <PrimaryButton
                  value="Start Quiz"
                  handler={handleNextQuestion}
                  type="contained"
                  color="primary"
                />
              </>
            )}
            {quizScreen === "Show Question" && <Question />}
            {quizScreen === "Show Answers" && <Solution />}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
