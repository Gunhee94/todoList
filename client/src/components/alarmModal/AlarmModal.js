import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from "./AlarmModal.module.css"
import { useState } from 'react';
import { Box } from '@mui/material';


function AlarmModal ({ todoList, open, setOpen, updateTodoList, setIsRunning }) {

    const hours = Array(24).fill().map((e, i) => String(i++).padStart("2", 0) );
    const minutes = Array(12).fill().map((e, i) => String(i*5).padStart("2", 0) );
    const [hour, setHour] = useState(todoList.alarmTime === null ? "00" : todoList.alarmTime.substr(0, 2));
    const [minute, setMinute] = useState(todoList.alarmTime === null ? "00" : todoList.alarmTime.substr(2, 2));

    // 알람설정시
    const setAlarm = () => {

        const today = new Date();
        const hours = ('0' + today.getHours()).slice(-2); 
        const minutes = ('0' + today.getMinutes()).slice(-2);
        const time = hours + minutes;

        const lastYn = hour + minute <= time ? false : true;

        const newTodoList = {...todoList};
        newTodoList.alarmTime = hour + minute 
        newTodoList.alarmCheck = !lastYn 
        
        updateTodoList(newTodoList);
        setOpen(false);
        setIsRunning(true);
    }
    
    return (
        <Modal open={open} onClose={() => {setOpen(false)}}>
            <Box className={styles.box}>
                <div className={styles.div}>
                    <Select value={hour} onChange={(e) => {setHour(e.target.value)}} className={styles.select}>
                        {
                            hours.map((e) => <MenuItem value={e} key={e}>{e}</MenuItem> )
                        }
                    </Select>
                    <Select value={minute} onChange={(e) => {setMinute(e.target.value)}} className={styles.select}>
                        {
                            minutes.map((e) => <MenuItem value={e} key={e}>{e}</MenuItem> )
                        }
                    </Select>
                    <Button variant="contained" onClick={setAlarm}>확인</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default AlarmModal;