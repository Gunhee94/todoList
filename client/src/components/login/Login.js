import Container from '@mui/material/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';

function Login() {
    return (

        <Container fixed>
            <form action="/login" method="POST" className='center'>
                <FormControl>
                    <FormLabel>아이디</FormLabel>
                    <Input type="text" name="id" />
                </FormControl>
                <FormControl>
                    <FormLabel>비밀번호</FormLabel>
                    <Input type="password" name="pw" />
                </FormControl>
                <hr style={{marginTop: "20px"}}/>
                <Button type="submit" variant="contained">로그인</Button>
            </form>
        </Container>
    )
}

export default Login;