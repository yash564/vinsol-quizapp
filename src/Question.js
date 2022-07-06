class Question {
  getQuestion() {
    const ops = ["+", "-", "*", "/"];
    let expectedAnswer;
    const leftOperand = Math.floor(Math.random() * 10) + 1;
    const rightOperand = Math.floor(Math.random() * 10) + 1;
    const operatorIndex = Math.floor(Math.random() * 4);
    const question = `${leftOperand} ${ops[operatorIndex]} ${rightOperand}`;
    switch (operatorIndex) {
      case 0:
        expectedAnswer = leftOperand + rightOperand;
        break;
      case 1:
        expectedAnswer = leftOperand - rightOperand;
        break;
      case 2:
        expectedAnswer = leftOperand * rightOperand;
        break;
      case 3:
        expectedAnswer = leftOperand / rightOperand;
        break;
    }
    return { question, expectedAnswer };
  }
}

const quizQuestion = new Question();

export default quizQuestion; 
