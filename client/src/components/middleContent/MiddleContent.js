import { useState } from "react";
import useInterval from "../../hooks/useInterval";
import styles from "./MiddleContent.module.css"

function MiddleContent ( { todoList, colSpan, updateTodoList, height, textRef, isRunning, setIsRunning } ) {

    const [content, setContent] = useState(todoList.content);
    const [isTime, setIsTime] = useState(false);
    
    useInterval(() => {
        const today = new Date();
        const hours = ('0' + today.getHours()).slice(-2); 
        const minutes = ('0' + today.getMinutes()).slice(-2);
        const time = hours + minutes;

        // 알람 시간이 있음
        if (todoList.alarmTime !== null) {
            setIsTime(Number(todoList.alarmTime) <= Number(time));

            // 알람시간이 현재시간보다 작으면
            if (Number(todoList.alarmTime) <= Number(time)) {
                setIsRunning(false)

                // 체크표시가 없고, 알람 확인을 하지 않은경우
                if (!todoList.cptYn && !todoList.alarmCheck) {

                    alarmCheckFn();
            
                    alert("[미리알림] "+ todoList.content);
                }
            };

        }

    }, isRunning ? 1000 : null);

    //글작성시
    const handleSetValue = (e) => {
        setContent(e.target.value);

        const newTodoList = {...todoList};
        newTodoList.content = e.target.value;

        updateTodoList(newTodoList)
    }

    // 알람 확인시
    const alarmCheckFn = () => {

        const newTodoList = {...todoList};
        newTodoList.alarmCheck = true 
        
        updateTodoList(newTodoList);
    }

    return (
        <td className={styles.secondTd} colSpan={colSpan}>
            <textarea type="text" ref={textRef} rows={1}
                style={{color : todoList.cptYn ? "gray" : "black"}}
                value={content}
                onKeyUp={height}
                onKeyDown={height}
                onChange={(e) => handleSetValue(e)}
            />
            {
                todoList.alarmTime != null ? 
                <span className={styles.span} style={{color : isTime ? "red" : "gray"}}>
                        {todoList.alarmTime.substr(0, 2)} : {todoList.alarmTime.substr(2, 2)}    
                </span>
                :
                null
            }
        </td>
    )
}

export default MiddleContent;