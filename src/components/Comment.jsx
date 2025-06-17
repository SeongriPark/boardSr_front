import Button from "./Button";
import React, { useState, useEffect } from "react";
import Reply from "./Reply";

export default function Comment({ data }) {

    const [comment, setComment] = useState(data.content); // 현재 댓글 내용
    const [isEditing, setIsEditing] = useState(false); // 댓글 편집 모드 상태
    const [isReply, setIsReply] = useState(false); // 대댓글 상태 - 댓글달기 클릭 시
    const [reply, setReply] = useState([]); // 대댓글 목록
    const [newReply, setNewReply] = useState(""); // 새 대댓글

    // 댓글 수정
    const modifyComment = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8080/api/comment/update/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment }),
            });

            alert("댓글이 수정되었습니다.")
            setIsEditing(false)
            window.location.reload(true)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelEdit = () => {
        setIsEditing(false)
        setComment(data.content) // 내용 원복
    }

    // 댓글 삭제
    const deleteComment = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            try {
                fetch(`http://localhost:8080/api/comment/delete/${data.id}`, {
                    method: 'DELETE'
                });

                alert("댓글이 삭제되었습니다.")
                window.location.reload(true);
            } catch (error) {
                console.log(error)
            }
        }
    }

    // 대댓글 조회
    useEffect(() => {
        const getReply = async () => {
            try{
                const replyRes = await fetch(`http://localhost:8080/api/comment/reply/${data.id}`);
                const getReply = await replyRes.json();
                console.log(getReply);
                setReply(getReply);
            }catch(error) {
                console.log(error);
            }
        }
        getReply();
        }, [data.id]); // 변수가 변경될 때마다 실행


    // 대댓글 생성
    const createReply = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:8080/api/comment/reply/create/${data.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content : newReply}),
            });

            alert("대댓글이 등록되었습니다.");
            window.location.reload(true);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <tr>
            <td>{data.name}</td>
            <td colSpan={2}>
                {isEditing ? ( // isEditing 상태이면 input 창이 나오고, 아니면 원래 댓글 내용
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                ) : (
                    data.content
                )}
            </td>
                {isEditing ? (
                    <>
                        <td><Button text={"저장"} action={modifyComment} /></td>
                        <td><Button text={"취소"} action={cancelEdit} /></td>
                    </>
                ) : (
                    <>
                        <td><Button text={"수정"} action={() => setIsEditing(true)} /></td>
                        <td><Button text={"삭제"} action={deleteComment} /></td>
                        <td><Button text={"댓글쓰기"} action={() => setIsReply(true)} /></td>
                    </>
                )}
            </tr>
            {isReply && ( // 댓글달기를 클릭했을 때
                <tr>
                    <td colSpan={3}>
                        <input type="text" value={newReply} onChange={(e) => setNewReply(e.target.value)}/>
                    </td>
                    <td>
                        <Button text={"저장"} action={createReply}/>
                    </td>
                    <td>
                        <Button text={"취소"} action={() => setIsReply(false)}/>
                    </td>
                </tr>
            )}
            {reply.map((item) => (
                <Reply key={item.id} data={item}/>
            ))}
        </> 
    )
}