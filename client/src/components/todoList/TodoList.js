import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useEffect, useRef, useState } from 'react';
import styles from "./TodoList.module.css"
import AlarmModal from '../alarmModal/AlarmModal';
import MiddleContent from '../middleContent/MiddleContent';

function TodoList(props) {

    const [todoList, setTodoList] = useState(props.data);
    const [displayYn, setDisplayYn] = useState(false);
    const [open, setOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const textRef = useRef();

    useEffect(() => {
        
        const timer = setTimeout(() => {height()}, 10);
        window.addEventListener('resize', height);

        return () => {
            clearTimeout(timer);
            window.addEventListener('resize', height);
        }
        
    }, []) 

    const height = () => {
        let textTag = textRef.current;
        textTag.style.height = 'auto';
        textTag.style.height = textTag.scrollHeight + 'px';
    }

    const arrowClick = () => {
        setDisplayYn(!displayYn);
        setTimeout(() => {height()}, 10);
    }

    // 체크 버튼 눌렀을 때 
    const checkClick = () => {

        const newTodoList = {...todoList};
        newTodoList.cptYn = !todoList.cptYn

        updateTodoList(newTodoList);
    }

    // 플래그 버튼 눌렀을 때
    const flagClick = () => {

        const newTodoList = {...todoList};
        newTodoList.flagYn = !todoList.flagYn;

        updateTodoList(newTodoList);
    }

    // 업데이트 피치
    const updateTodoList = (newTodoList) => {

        fetch(`/update/${todoList._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todoList : newTodoList
            }),
            })
            .then(res => {
            if (res.ok) {
                setTodoList(newTodoList);
                props.checkUpdate();
            }
            })
    }

    // 글 하나 삭제 눌렀을 때
    const deleteTodoList = () => {
        fetch(`/delete/${todoList._id}`, {
            method: "DELETE",
            })
            .then(res => {
            if (res.ok) {
                setTodoList({_id:0});
                props.checkUpdate()
            }
            })   
    }

    if (todoList._id === 0) {
        return null;
    }
    
    return (
       
        <tr>
            <td className={styles.firstTd}>
                <Radio color="secondary" checked={todoList.cptYn} onClick={checkClick}/>
            </td>

            {
                displayYn ?
                <>
                    <MiddleContent todoList={todoList} updateTodoList={updateTodoList} height={height} textRef={textRef} isRunning={isRunning} setIsRunning={setIsRunning}/>
                    <td>
                        <IconButton onClick={() => {setOpen(true)}}>
                            <AlarmIcon className={styles.red} />
                        </IconButton>

                        <AlarmModal open={open} setOpen={setOpen} todoList={todoList} updateTodoList={updateTodoList} setIsRunning={setIsRunning}/>
                    </td>
                    <td>
                        <IconButton onClick={flagClick}>
                            <FlagIcon style={{color : todoList.flagYn ? "orange" : "gray"}}/>
                        </IconButton>
                    </td>
                    <td>
                        <IconButton onClick={deleteTodoList}>
                            <DeleteIcon className={styles.gray}/>
                        </IconButton>
                    </td>
                </>
                :
                <>
                    <MiddleContent colSpan={4} todoList={todoList} updateTodoList={updateTodoList} height={height} textRef={textRef} isRunning={isRunning} setIsRunning={setIsRunning}/>
                </>
            }
            <td >
                <IconButton onClick={arrowClick}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </td>
        </tr>
    )
}

export default TodoList;