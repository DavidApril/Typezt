'use client';

import React, {ChangeEvent, useEffect} from "react";
import {Input} from "@/core";

const SPACE = 'Space';
const ENTER = 'Enter';

interface Letter {
  letter: character,
  correct: boolean
}

type character = string

export const Typer = () => {

  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consectetur commodo gravida. Suspendisse rutrum augue vel quam imperdiet, ac cursus lorem consectetur. Aliquam erat volutpat. Curabitur in ex sodales, varius justo et, eleifend mauris. Proin eleifend luctus orci, a cursus sapien convallis ut. Vestibulum erat mi, vehicula eget purus in, cursus molestie ex. Aliquam varius molestie mollis. In mollis ipsum mauris, at gravida ligula convallis eget. Nulla id pretium justo. Vestibulum orci ipsum, vestibulum non lacus non, maximus scelerisque orci. In ut consectetur nunc, sit amet laoreet velit. Morbi sagittis lacinia sapien non lobortis.'.split(' ')

  const [wordCursor, setWordCursor] = React.useState<number>(0)
  const [letterCursor, setLetterCursor] = React.useState<number>(0)
  const [currentWord, setCurrentWord] = React.useState<string>(text[0])
  const [currentLetter, setCurrentLetter] = React.useState<character>(text[0][0])
  const [currentInputValue, setCurrentInputValue] = React.useState<string>('');
  const [lastLetterPressed, setLastLetterPressed] = React.useState<Letter>()

  const [history, setHistory] = React.useState<Letter[]>([])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentInputValue(e.target.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = e.code


    if (keyCode === SPACE || keyCode === ENTER) {
      setWordCursor(prev => prev + 1)
      if (getRestOfWord().length > 0)
        getRestOfWord().split('').forEach((letter) => {
          setHistory(prev => [...prev, {letter, correct: false}])
        })
    }
  }

  function getRestOfWord() {
    return currentWord.slice(letterCursor)
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key
    const keyCode = e.code

    const lastLetterIsCorrect = checkLetter(e.key)

    if (key === 'Shift' || key === 'Alt' || key === 'Control' || key === 'Backspace') return;

    setLastLetterPressed({letter: e.key, correct: lastLetterIsCorrect})

    if (keyCode === SPACE || keyCode === ENTER) {
      setCurrentInputValue('')
    }

    if (lastLetterIsCorrect) {
      setLetterCursor(prev => prev + 1);
    }
  }

  function checkLetter(letter: string): boolean {
    if (letterCursor < currentWord.length) {
      return letter === currentLetter;
    } else {
      return letter === ' ';
    }
  }

  React.useEffect(() => {
    if (!lastLetterPressed) return;
    setHistory(prev => [...prev, lastLetterPressed]);
  }, [lastLetterPressed]);

  React.useEffect(() => {
    setCurrentWord(text[wordCursor])
  }, [wordCursor, text]);

  useEffect(() => {
    setCurrentLetter(currentWord[letterCursor])
  }, [currentWord, letterCursor]);

  useEffect(() => {
    setLetterCursor(0)
  }, [currentWord]);

  return (
    <div className="flex flex-col">
      <article className="relative">

        {JSON.stringify({wordCursor})} <br/>
        {JSON.stringify({letterCursor})} <br/>
        {JSON.stringify({currentWord})} <br/>
        {JSON.stringify({currentLetter})} <br/>
        {JSON.stringify({lastLetterPressed})} <br/>
        {JSON.stringify({history})} <br/>

        {history.map((item, index) => {
          return <span className={item.correct ? 'text-green-700' : 'text-red-700'} key={index}>{item.letter}</span>
        })}

      </article>
      <Input
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        value={currentInputValue}
      />
    </div>
  );
}