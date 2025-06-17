'use client'

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import "@/style.css"

const createPost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handelSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 막기. 브라우저가 자동으로 하려는 일을 멈추고, 우리가 원하는 대로 제어 할 수 있음.
                            // 폼이 제출되면 브라우저가 기본적으로 하는 행동 : 페이지 새로고침(폼 데이터가 서버로 전동되고 페이지를 새로고침), 데이터초기화(입력한 값 초기화가 될 수 있음)
        try{
            const res = await fetch('http://localhost:8080/api/board/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, content}),
            });

            alert("게시물이 등록되었습니다.");
            router.push(`/main`)

        } catch(error) {
            console.log(error);
        }
    };

    return(
        <>
            <div>
                <div>
                    <h3>자유게시판</h3>
                </div>
                <div>
                    <form id="createPost">
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/><br/>
                        <label htmlFor="content">내용</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required/><br/>
                        <Button text={"등록하기"} action={handelSubmit}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default createPost;