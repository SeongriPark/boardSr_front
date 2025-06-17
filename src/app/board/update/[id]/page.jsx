'use client'

import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const UpdatePost = ({params}) => {

    const id = params.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    useEffect(() => { // 컴포넌트가 화면에 나타나거나 업데이트 될 때(렌더링될 때), 또는 사라질 때 특정 코드를 실행하고 싶을 때 사용하는 도구
                      // 데이터 가져오기, 타이머 설정, 이벤트 리스너 추가 같은 부수적인 작업이 필요할 때 처리해준다.
        const getPost = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/board/${id}`);
                const getPost = await res.json();
                const getTitle = getPost.title
                const getContent = getPost.content

                setTitle(getTitle);
                setContent(getContent);
            } catch (error) {
                console.log(error)
            }
        }
        getPost();
    }, []); // *의존성배열* 빈 배열 : 컴포넌트가 처음 렌더링 될 때 한 번만 실행(변수가 있다면 배열안의 변수가 변경될 때마다 실행/생략 시 렌더링할 때마다 실행)

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/board/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            alert("게시물이 수정되었습니다.");
            router.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    const cancle = () => {
        router.back();
    }

    return (
        <>
            <div>
                <div>
                    <h3>자유게시판</h3>
                </div>
                <div>
                    <form id="updatePost">
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
                        <label htmlFor="content">내용</label>
                        <input type="textarea" id="content" value={content} onChange={(e) => setContent(e.target.value)} /><br/>
                        <Button text={"수정하기"} action={handelSubmit} />
                    </form>
                    <Button text={"취소"} type="button" action={cancle}/>
                </div>
            </div>
        </>
    )
}

export default UpdatePost;