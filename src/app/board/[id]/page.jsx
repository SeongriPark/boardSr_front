'use client'

import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import "@/style.css"
import Comment from "@/components/Comment";

const GetPost = ({params}) => { // App Router 에서 동적 라우팅을 다룰 때 사용되는 방식. 
                                // next.js가 동적 라우팅을 처리할 때 페이지에 자동으로 전달해주는 props 로 동적인 부분[id]를 담고있다.
                                // /board/123 에 접속 -> {params} 는 {id:"123"} 객체를 담고있음.
                                // fetch는 이 id 를 사용해서 서버에서 특정 게시물 데이터를 가져옴.


    const [post, setPost] = useState({}) // 상태는 컴포넌트가 내부적으로 관리하는 데이터로 컴포넌트가 동적으로 변하는 값을 기억하고, 값이 바뀌면 화면을 자동으로 업데이트 한다.
                                         // 상태가 바뀌면 React가 Virtual Dom을 통해 필요한 부분만 렌더링한다.

    const [comment, setComment] = useState([]) // 이전에 작성된 댓글
    const [newComment, setNewComment] = useState("") // 새로운 댓글

    const id = params.id
    const router = useRouter()

    useEffect(() => {
        // async : 비동기 함수. fetch 는 비동기 작업이라 결과를 바로 얻을 수 없는데 async/await를 쓰면 코드가 간결해진다.
        // 안쓸경우? Promise를 직접 다뤄야하는데 코드가 복잡해짐. (.then(res => res.json()).catch... 등)
        // 시간이 걸리는 작업(서버에서 데이터 가져오기, 파일 읽기 등)을 처리할 때 주로 사용되며 서버 응답을 기다리는 동안 브라우저는 다른 작업을 계속 할 수 있다.
        // 비동기 : 일이 끝나기를 기다리지 않고, 다른 일을 동시에 진행 할 수 있는 방식.
        // JavaScript가 단일 스레드인데 비동기 작업이 가능한 이유는, 시간이 걸리는 작업(예: 네트워크 요청, 파일 읽기)을 브라우저나 Node.js의 내부 엔진에 위임하기 때문이다.

        const fetchData = async () => {
            try{
                const postRes = await fetch(`http://localhost:8080/api/board/${id}`);
                const getPost = await postRes.json();
                setPost(getPost);

                const commentRes = await fetch(`http://localhost:8080/api/comment/${id}`)
                const getComment = await commentRes.json();
                setComment(getComment);
            }catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const move = () => {
        router.push(`/board/update/${id}`)
    }

    // 게시물 삭제
    const deletePost = async () => {
        if(confirm("정말로 삭제하시겠습니까?")) {
            try{
                const res = await fetch(`http://localhost:8080/api/board/delete/${id}`, {
                    method: 'DELETE'
                });
                
                if (res.ok) {
                    alert("게시물이 삭제되었습니다.")
                    router.push('/main')
                } else {
                    alert("게시물 삭제에 실패했습니다.")
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    // 댓글 생성
    const createComment = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch(`http://localhost:8080/api/comment/create/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content : newComment}),
            });

            if (res.ok) {
                alert("댓글이 등록되었습니다.");
                window.location.reload(true);
            } else {
                alert("댓글 등록에 실패했습니다.");
            }
        }catch(error){
            console.log(error);
        }
    };

    return(
        <div id="post-container">
            <div className="post-header">
                <h3>자유게시판</h3>
                <div className="post-actions">
                    <Button text={"수정하기"} action={move}/>
                    <Button text={"삭제하기"} action={deletePost}/>
                </div>
            </div>

            <div id="post-view">
                <div className="post-view-header">
                    <div className="view-item">
                        <span className="view-value">{post.name}</span>
                    </div>
                     <div className="view-item-wide">
                        <span className="view-value">{post.title}</span>
                    </div>
                     <div className="view-item">
                        <span className="view-label">작성일</span>
                        <span className="view-value">{post.date}</span>
                    </div>
                </div>
                <div className="post-view-content">
                    {post.content}
                </div>
            </div>

            <div id="comment-section">
                {comment.map((item) => (
                    <Comment key={item.id} data={item}/>
                ))}
            </div>

            <form id="comment-form" onSubmit={createComment}>
                <textarea 
                    id="comment-input" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    required
                />
                <Button text={"댓글달기"}/>
            </form>
        </div>
    )
}

export default GetPost;