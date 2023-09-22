import { createContext, useState, useContext } from "react";



const ScoreContext = createContext();

export const TEMPLATESCORE = [
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    },
    {
        score: '',
        putts: '',
        gir: '',
        fir: '',
        finished: false
    }
]

export function ScoreProvider({ children }) {
  const [score, setScore] = useState({userScore: TEMPLATESCORE.map(item => {return {...item}}), holes: []});

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}