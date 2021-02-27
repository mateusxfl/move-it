import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdowContextData {
    minutes: number;
    seconds: number;
    hasFineshed: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdowProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdowContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFineshed, setHasFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);

        setIsActive(false);
    
        setTime(25*60);

        setHasFineshed(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFineshed(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{minutes, seconds, hasFineshed, isActive, startCountdown, resetCountdown}}>
            { children }
        </CountdownContext.Provider>
    )
}