const CheckBoxList = document.querySelectorAll('.custom-box')
const inputCheck = document.querySelectorAll('.input')
const errorLabel = document.querySelector('.warning')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const footerQuote = document.querySelector('.quote')

const allQuootes = [
    'Raise the bar by completing your goals!',
    'Be consistent, it fuels the journey',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for google-meet :D',
]
 
const allFooterQuote = [
    'Move one step ahead, today!',
    'You are on the right track—keep going',
    'You are on the right track—keep going',
    'Consistency fuels the journey, hard work paves the path to victory!',
    'Your efforts are making a real difference.',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


 let completedGolsCount = Object.values(allGoals).filter((goal) => goal.completed).length

 progressValue.style.width = `${(completedGolsCount/inputCheck.length)*100}%`
 progressValue.firstElementChild.innerText = `${completedGolsCount}/${inputCheck.length} completed`

 progressLabel.innerText = allQuootes[completedGolsCount]

 footerQuote.innerText = allFooterQuote[completedGolsCount]

CheckBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allgoalsadded = [...inputCheck].every((input) => {
            return input.value
        })
        if (allgoalsadded){
            checkbox.parentElement.classList.toggle('completed')
            
            const inputID = checkbox.nextElementSibling.id
            allGoals[inputID].completed = !allGoals[inputID].completed
            completedGolsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGolsCount/4*100}%`
            progressValue.firstElementChild.innerText = `${completedGolsCount}/4 completed`
            progressLabel.innerText = allQuootes[completedGolsCount]
            footerQuote.innerText = allFooterQuote[completedGolsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            progressBar.classList.add('show-error')
            // errorLabel.style.display = "block"
        }
    })
})


inputCheck.forEach((input) => {
if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

if(allGoals[input.id].completed) {
    input.parentElement.classList.add('completed')
  }
}
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if(allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
          } else {
            allGoals[input.id] = {
              name: input.value,
              completed: false,
            }
          }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})


            
