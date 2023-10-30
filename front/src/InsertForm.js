import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function InsertForm() {
    function submit() {
        if(window.confirm('글을 등록하시겠습니까?')){
            const formData = new FormData();
            formData.append('title', document.getElementById('title').value);
            formData.append('contents', document.getElementById('contents').value)
            formData.append('userId', document.getElementById('userId').value)

            axios({
                method: 'post',
                url: '/api/board/insert',
                data: formData,
            })
                .then((result) => {
                    console.log('요청성공')
                    console.log(result)

                })
                .catch((error) => {
                    console.log('요청실패')
                    console.log(error)
                })
        }
    }
    return (
        <Table striped bordered hover size="sm">
            <tbody>
            <tr>
                <td width="20%">글 제목</td>
                <td width="80%"><input id="title"/></td>
            </tr>
            <tr>
                <td width="20%">글 내용</td>
                <td width="80%"><input id="contents"/></td>
            </tr>
            <tr>
                <td width="20%">작성자</td>
                <td width="80%"><input id="userId"/></td>
            </tr>
            <tr>
                <td colSpan="3" ><Button onClick={() => submit()} variant="danger" style={{float:"right"}}>작성하기</Button></td>
            </tr>
            </tbody>
        </Table>
    );
}

export  default  InsertForm;