'use client'

import BoardItem from "@/components/BoardItem";
import Button from "@/components/Button";
import Paging from "@/components/Paging";
import "@/style.css"
import Link from "next/link";
import React, {useState, useEffect} from "react"

const BoardList = () => {

    const [post, setPost] = useState([]); // 게시물 객체배열

    // 컴포넌트가 화면에 나타나거나 업데이트 될 때(렌더링될 때), 또는 사라질 때 특정 코드를 실행하고 싶을 때 사용하는 도구
    // 데이터 가져오기, 타이머 설정, 이벤트 리스너 추가 같은 부수적인 작업이 필요할 때 처리해준다.
    useEffect(() => {
        const getBoardList = async () => { // 전체 게시물 불러오기
            try{
                const res = await fetch('http://localhost:8080/api/board/list');
                const getPost = await res.json();
                console.log(getPost);
                setPost(getPost);
            }catch(error){
                console.log(error);
            }
        }
        getBoardList();
    }, []);

    return(
        <>
            <div>
                <div>
                    <h3>자유게시판</h3>
                </div>
                <div>
                    <table id="boardlist">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>글쓴이</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.map((item) => (
                                    <BoardItem data={item}/>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link href={'board/create'}><Button text={"글쓰기"}/></Link>
                </div>
                <div>
                    <Paging text={"1"}/>
                    <Paging text={"2"}/>
                    <Paging text={"3"}/>
                    <Paging text={"4"}/>
                    <Paging text={"5"}/>
                    <Paging text={"6"}/>
                    <Paging text={"7"}/>
                    <Paging text={"8"}/>
                    <Paging text={"9"}/>
                    <Paging text={"10"}/>
                </div>
            </div>
        </>
    ) 


}

export default BoardList;
