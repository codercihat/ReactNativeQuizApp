import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { quizData } from "./quizData";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setTimeLeft(10);
        } else {
          setQuizCompleted(true);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentQuestion, timeLeft]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(10);
  };
  // Display questions and answers when the quiz is completed
  const displayAnswers = quizData.map((question, index) => (
    <View key={index}>
      <View style={{}}>
        <Text style={[styles.question]}>
          Question {index + 1}:{quizData[index].question}
        </Text>
      </View>
      <Text style={styles.correctAnswer}>
        Correct Answer:
        {quizData[index].correctAnswer}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <ScrollView>
        {quizCompleted ? (
          <View style={{ marginTop: 0, marginHorizontal: 20 }}>
            <Text
              style={{ textAlign: "center", fontSize: 22, fontWeight: "900" }}
            >
              Your Score: {score}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 22, fontWeight: "600" }}
            >
              Questions and Answers:
            </Text>
            {displayAnswers}
            <TouchableOpacity
              style={styles.retestButton}
              onPress={handleRetest}
            >
              <Text>RETEST</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View
              style={
                {
                  /* backgroundColor: "#CDB4DB",
                marginBottom: 10,
                padding: 15,
                borderRadius: 18,
                borderWidth: 5,
                borderColor: "#9D54C7", */
                }
              }
            >
              <Text style={styles.question}>
                {quizData[currentQuestion].question}
              </Text>
            </View>
            {quizData[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.timer}>Time Left: {timeLeft} sec</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    alignItems: "center",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#CDB4DB",
    marginBottom: 10,
    padding: 15,
    borderRadius: 18,
    borderWidth: 5,
    borderColor: "#9D54C7",
  },
  option: {
    backgroundColor: "#FFAFCC",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#906574",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "1D3557",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  retestButton: {
    backgroundColor: "#FFAFCC",
    padding: 10,
    fontWeight: "900",
    alignItems: "center",
  },
  timer: {
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: "#A2D2FF",
    paddingVertical: 11,
    marginRight: 120,
    borderRadius: 12,
  },
  correctAnswer: {
    color: "#906574",
    fontSize: 15,
    fontWeight: "900",
    backgroundColor: "#BDE0FE",
    padding: 15,
    margin: 12,
  },
});
export default Quiz;
