const $addBtn = $(".add-btn");
const $playBtn = $(".play-btn");
const $home = $(".home")
const $game = $(".game")
const $add = $(".add-page")
const $custWordbtn = $(".custom-word-btn")
const $custWordDef = $(".custom-word-def")
const $custWordAns = $(".custom-word-ans")
const $backBtn = $(".back-btn")
const $qBox = $(".q-box")
const $aBox = $(".a-box")
const $nxtBtn = $(".next-btn")
let questionArray = []
let qNumber = 0
let numArr = []
let score = 0
let $dScore = $(".scoreboard")
let $fScore = $(".score")

//constructor for questions and answer objects includes check answer method
class Question {
  constructor(question, answer, wrong1, wrong2, wrong3) {
    this.question = question;
    this.answer = answer;
    this.wrong1 = wrong1;
    this.wrong2 = wrong2;
    this.wrong3 = wrong3;
    //uses random number for ID then uses ID to sort making them random
    this.id = Math.floor(Math.random() * 1000) * 19
  }
  //Built it method that check answer using the *this* keyword
  checkAnswer() {
    $(".btn").click((e) => {
      if ($(e.target).text() === this.answer) {
        score++
        scoreCorrect()
        qNumber++
        $dScore.text(score)
        $aBox.children().remove()
        displayQuestion()
      } else {
        qNumber++
        scoreIncorrect()
        $aBox.children().remove()
        displayQuestion()
      }
    })
  }
}

let q0 = new Question("Having or showing strong feeling of attraction or love", "amorous", "melliflous", "care-taker", "prehensile")
let q1 = new Question("A source of divine inspiration or A guiding spirit", "muse", "prevailing", "wonderous", "affluent")
let q2 = new Question("An abunadant supply of or The opposite of deplete", "replete", "warstore", "endemic", "demotic")
let q3 = new Question("Living or occuring without the presence of oxygen", "anaerobic", "sybiotic", "pedantic", "vavacious")
let q4 = new Question("Feeling or showing extreme discouragement or depression", "despondent", "circumscribe", "automaton", "distemper")
let q5 = new Question("Stretched or bulging out in all directions or Swelled", "distended", "permutation", "corpulent", "undulant")
let q6 = new Question("One who argues in favor of something or An advocate", "proponent", "terminus", "delegate", "caper")
let q7 = new Question("Without a definite shape or form or Shapeless", "amorphous", "servile", "assimilate", "acropolis")
let q8 = new Question("Stubborn or Determined to cling to something", "tenacious", "proscribe", "expurgate", "immutable")
let q9 = new Question("Instruction or guidance of an individual or Guardianship", "tutelage", "effusive", "fortitude", "abtruse")
questionArray.push(q0, q1, q2, q3, q4, q5, q6, q7, q8, q9)

//page transition home to add word
$addBtn.click(() => {
  $home.hide()
  $add.show()
})

//set variables for create funciton
let customDefinition
let customAnswer
let valid = false
//uses wrong array rather than user input to select random wrong answers for custom question
let wrongArray = ['endemic', 'demotic', 'domineering', 'mellifluous', 'affluent', 'prehensile', 'feeblish', 'keister', 'reticulate', 'advocate', 'apathetic', 'perturb', 'atheistic', 'urbane', 'endemic', 'demotic', 'asinine', 'caper', 'fortitude', 'natal', 'juxtapose', 'monotheism', 'pedantic', 'abstruse', 'terminus', 'retrogress', 'temporal', 'inanimate', 'perennial', 'corporeal', 'corpulent', 'tactile', 'tangible', 'codex', 'annuity', 'capitulate', 'regimen', 'criterion', 'abjure', 'perjury', 'symbiosis', 'immutable', 'defunct', 'permutation', 'fractal', 'abnegation', 'patrician']
//vailidation and data collection from form for add word function
$custWordbtn.click(() => {
  customDefinition = $custWordDef.val()
  customAnswer = $custWordAns.val()
  if ($custWordDef.val().length <= 3) {

    $(".btn-feedback").text("please enter definition more than 3 characters").addClass("wrong")
  }
  if ($custWordAns.val().length <= 2) {
    $(".btn-feedback").text("please enter an answer at least 3 characters")
  }
  if ($custWordDef.val().length >= 5 && $custWordAns.val().length >= 2) {
    valid = true
  }
  console.log(valid)
  if (valid) {
    let randomWrong1 = Math.floor(Math.random() * wrongArray.length)
    let randomWrong2 = Math.floor(Math.random() * wrongArray.length)
    let randomWrong3 = Math.floor(Math.random() * wrongArray.length)
    let customWrong1 = wrongArray[randomWrong1]
    let customWrong2 = wrongArray[randomWrong2]
    let customWrong3 = wrongArray[randomWrong3]
    let qCustom = new Question(customDefinition, customAnswer, customWrong1, customWrong2, customWrong3)
    questionArray.shift()
    questionArray.push(qCustom)
  } else {
    return
  }
  $add.hide()
  $game.show()
  displayQuestion()
})

//goes back to home page
$(".back-btn").click(() => {
  $add.hide()
  $home.show()
})

//play game with built ins
$playBtn.click(() => {
  $home.fadeOut(500)
  $game.fadeIn(1500)
  displayQuestion()
})

//main game function that sets randoms and creates buttons
function displayQuestion() {
  $dScore.show()
  if (qNumber === 10) {
    return gameOver()
  }
  numArr = []
  randomNumber()
  questionArray.sort((a, b) => a.id - b.id)
  let currentQuestion = questionArray[`${qNumber}`]
  $qBox.text(currentQuestion.question)
  let a1 = $(`<div class="answer1"></div>`)
  let a2 = $(`<div class="answer2"></div>`)
  let a3 = $(`<div class="answer3"></div>`)
  let a4 = $(`<div class="answer4"></div>`)
  $aBox.append(a1, a2, a3, a4)
  let answer1 = $(`<button class="btn">${currentQuestion.wrong1}</button>`)
  let answer2 = $(`<button class="btn">${currentQuestion.wrong2}</button>`)
  let answer3 = $(`<button class="btn">${currentQuestion.wrong3}</button>`)
  let answer4 = $(`<button class="btn">${currentQuestion.answer}</button>`)
  $(`.answer${numArr[0]}`).append(answer1)
  $(`.answer${numArr[1]}`).append(answer2)
  $(`.answer${numArr[2]}`).append(answer3)
  $(`.answer${numArr[3]}`).append(answer4)
  currentQuestion.checkAnswer()
}

//creates a random array of numbers 1-4 places answers in those spots above usin numArr
function randomNumber() {
  let num = Math.floor(Math.random() * 4) + 1
  if (numArr.length === 4) {
    return
  }
  if (numArr.includes(num)) {
    randomNumber()
  } else {
    numArr.push(num)
    randomNumber()
  }
}

//scoring styles
function scoreCorrect() {
  $dScore.addClass("right")
  setTimeout(() => { $dScore.removeClass("right") }, 500)
}
function scoreIncorrect() {
  $dScore.addClass("wrong")
  setTimeout(() => { $dScore.removeClass("wrong") }, 500)
}

//gameover function with themed ranking for fun
let $fPage = $(".feedback-page")
let $rank = $(".rank")
let $com = $(".comment")

function gameOver() {
  $fScore.text(score)
  $qBox.text("GameOver")
  if (qNumber >= 10) {
    $game.hide()
    $fPage.show()
  }
  if (score === 0) {
    $com.text("Terrible!")
    $rank.text("Go'On Git!")
  }
  else if (score <= 3) {
    $com.text("Well..")
    $rank.text("Cow-Poke")
  }
  else if (score <= 6) {
    $com.text("That'll Do")
    $rank.text("Farm-Hand")
  }
  else if (score <= 9) {
    $com.text("Nice Work Cowboy")
    $rank.text("Word-Wrangler")
  }
  else {
    $com.text("Bona-Fide")
    $rank.text("Word-Slinger")
  }
  return score;
}

//simply reloads refreshes the entire page to start again
$("#play-again").click(() => {
  location.reload(true)
})