## ↑↓→← Arrow-game description

Player's goal is to press the keyboard arrow key that was shown to him before the next one appears. After three consecutive successful hits - game won, after three errors - lost.

## Test task

Test task consists of three steps, two of which are optional (3rd and 4th), but will be considered upon candidates comparison.

Steps:

1. Do src/App.tsx code review, point out all mistakes in existing code. Write about architectural mistakes and suggestions onto fixes.
2. Design architectural solution for this task with [redux-saga](https://redux-saga.js.org/) in mind. Describe shape of reducers and how you break business logic into different sagas with minimum implementation details.
3. Implement designed solution.
4. Cover your solution with tests written in jest.

How your solution will be reviewed:

1. Ability to see obvious and not so obvious errors and suggest a solution, ability to see general logical flaws.
2. Ability to describe problem domain with sagas.
3. Redux-saga knowledge, code quality, absence of bugs.
4. Familiarity with jest and knowledge of testing approaches.

## Флоу работы

* Ждем когда пользователь начнет новую игру по кнопке старта и диспатчим экшн `startGame`
* В саге watchGameStarted смотрим что пользователь начал новую игру и диспатчим начальный экшн `changeActionToGuess` для текущей угадываемой стрелочки,
это тригернет первый запуск саги `watchActionToGuessChanged` из следующего шага
* Затем в саге `watchActionToGuessChanged` на каждую новую угадываемую стрелочку в игре обрабатываем ответ от пользователя (или его отсутствие)
и диспатчим новые угадываемые стрелочки через `changeActionToGuess` (чтобы эта сага выполнялась по циклу) пока не закончится игра через проверку в `checkGameState` в конце саги
* При рестарте игры обнуляем внутренний стейт и начинаем все сначала с шага 1

## Комментарии

* Покрыл тестами компоненты, хелперы, редакс, саги - запускаются по npm test