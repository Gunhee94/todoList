import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TodoList from '../todoList/TodoList';
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './Main.module.css'
import { useNavigate } from 'react-router-dom';

function Main(props) {

    const navigate = useNavigate(); 
    const [todoList, setTodoList] = useState([]);
    const [cptCnt, setCptCnt] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
        checkUpdate();
    }, [props.user])
   
    const fetchData = () => {
        if (props.user != null) {
            fetch(`/list`)
            .then(res => res.json())
            .then(data => setTodoList(data.todoList));   
        }
    }

    const checkUpdate = () => {
        if (props.user != null) {
            fetch(`/count`)
            .then(res => res.json())
            .then(data => setCptCnt(data.count));
        }
    }    

    const addTodoList = () => {
        if (props.user != null) {
            let today = new Date();   

            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let date = ('0' + today.getDate()).slice(-2);

            let newTodoList = {
                "content" : "",
                "date": year + month + date,
                "cptYn" : false,
                "flagYn" : false,
                "alarmTime" : null,
                "alarmCheck": null
            }

            if (!isLoading) {
                setIsLoading(true);
                fetch(`/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        todoList : newTodoList
                    }),
                })
                .then(res => {
                    if (res.ok) {
                        setIsLoading(false);
                        fetchData();
                    }
                })
            }
        } else {
            navigate('/login');
        }
    }

    // ????????? ?????????(????????? ????????? ?????????)
    const deleteTodoLists = () => {
        if(window.confirm("????????? ?????? ????????? ?????????????????????????")) {
            if (!isLoading) {
                    
                fetch(`/delete`, {
                method: "DELETE",
                })
                .then(res => {
                if (res.ok) {
                    setIsLoading(false);
                    fetchData();
                    checkUpdate();
                }
                }) 
                
            }
        }
    }

    return ( 

        <Container fixed>
            <h1>?????? ??????</h1>
            <div className="row">
                <p>{cptCnt} ???????????? ???

                {
                    cptCnt !== 0 ?
                    <span className={styles.blue} onClick={deleteTodoLists}>?????????</span>
                    :
                    <span className={styles.gray}>?????????</span>
                }
                </p>
            </div>
            {
                isLoading ? 
                <LoadingButton loading loadingIndicator="Loading???" variant="outlined"/>
                :
                <IconButton color="secondary" size='small' onClick={addTodoList}>
                    <AddCircleIcon/>????????? ?????? ??????
                </IconButton>
            }

            <hr/>

            <table>
                <tbody>
                    {
                        todoList.map((e) => {
                            return <TodoList data={e} key={e._id} cptCnt={cptCnt} checkUpdate={checkUpdate}/>
                            }
                        )
                    }
                </tbody>
            </table>
            
            
        </Container>

    )
}

export default Main;