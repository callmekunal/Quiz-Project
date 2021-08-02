const start_btn  = document.querySelector(".start_btn button");
const info_box  = document.querySelector(".info_box");
const exit_btn  = document.querySelector(".buttons .quit");
const continue_btn  = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
let timeCount = document.querySelector(".timer .timer_sec")
let timeLine = quiz_box.querySelector("header .time_line")

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick = ()=>{
   info_box.classList.remove("activeInfo");
   quiz_box.classList.add("activeQuiz");
   showQuestion(0);
   queCounter(1);
   startTime(timeValue);
   startTimeLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}
restart_quiz.onclick = ()=>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    que_count = 0;
    que_numb = 1;
    counter;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;

    showQuestion(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTime(15);
    clearInterval(counterLine);
    startTimeLine(widthValue);

}

next_btn.onclick = ()=>{
    if(que_count<questions.length-1){
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTime(15);
        clearInterval(counterLine);
        startTimeLine(widthValue);
    next_btn.style.display = "none";

        
    }else{
        console.log("Question completed");
        showResultBox();

    }
}

function showQuestion(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+questions[index].numb+'. '+questions[index].question+'</span>';
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'+
                    '<div class="option"><span>'+questions[index].options[1]+'</span></div>'+
                    '<div class="option"><span>'+questions[index].options[2]+'</span></div>'+
                    '<div class="option"><span>'+questions[index].options[3]+'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i><div>';
let crossIcon = '<div class="icon tick"><i class="fas fa-times"></i><div>';

optionSelected = (answer)=>{
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns=== correctAns){
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
        console.log("correct");
        userScore+=1;  
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        console.log("incorrect");
        for(let i=0;i<allOptions;i++){
            if(option_list.children[i].textContent==correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

showResultBox = ()=>{
   info_box.classList.remove("activeInfo");
   quiz_box.classList.remove("activeQuiz");
   result_box.classList.add("activeResult");
   const scoreText = result_box.querySelector(".score_text");
   if(userScore>3){
       let scoreTag = `<span>and congrats!, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
       scoreText.innerHTML = scoreTag;
   }
   else if(userScore>1){
        let scoreTag = `<span>and nice, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span>and sorry, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
}

startTime = (time)=>{
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0"+addZero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }   
    }
}



startTimeLine = (time)=>{
    counterLine = setInterval(timer,29);
    function timer(){
        time+=1;
        timeLine.style.width = time+"px";

        if(time>549){
            clearInterval(counterLine);
        }  
    }
}

queCounter = (index)=>{    
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag  = `<span><p> ${index}</p>of<p> ${questions.length}</p> Question </span>`
    bottom_ques_counter.innerHTML = totalQuesCountTag
}