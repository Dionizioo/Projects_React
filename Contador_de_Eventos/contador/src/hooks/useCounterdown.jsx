import { useState, useEffect } from 'react';


const useCountdown = (date) =>{

    //criando um estado para armazenar o tempo para mandar para o App.jsx - vamos criar states para dias, horas, minutos e segundos
    const [ days, setDays] = useState('');
    const [ hours, setHours] = useState('');
    const [ minutes, setMinutes] = useState('');
    const [ seconds, setSeconds] = useState('');

    const countDown= () => {
        // extraindo a data atual e em segundos
        const countDate = new Date(date).getTime();
        //data de hoje
        const now = new Date().getTime();

        //calcular o intervalo

        const interval = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const dayNumber = Math.floor(interval / day);
        const hourNumber = Math.floor((interval % day) / hour);
        const minNumber = Math.floor((interval %  hour) / minute);
        const segNumber = Math.floor((interval % minute) / second);

        setDays(dayNumber);
        setHours(hourNumber);
        setMinutes(minNumber);
        setSeconds(segNumber);


    }

    //resultado vai atualizar a cada segundo
    setInterval(countDown, 1000);
    

    return [days, hours, minutes, seconds]

}

export default useCountdown;