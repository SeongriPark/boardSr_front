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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: comment }),
            });

            if(res.ok) {
                alert("댓글이 수정되었습니다.");
                window.location.reload();
            } else {
                alert("댓글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.log(error);
        }
        setIsEditing(false);
    }

    const cancelEdit = () => {
        setIsEditing(false);
        setComment(data.content);
    }

    // 댓글 삭제
    const deleteComment = async () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/comment/delete/${data.id}`, {
                    method: 'DELETE'
                });
                if(res.ok) {
                    alert("댓글이 삭제되었습니다.");
                    window.location.reload();
                } else {
                    alert("댓글 삭제에 실패했습니다.");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // 대댓글 조회
    useEffect(() => {
        const getReply = async () => {
            try{
                const replyRes = await fetch(`http://localhost:8080/api/comment/reply/${data.id}`);
                const getReply = await replyRes.json();
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({content : newReply}),
            });
            if(res.ok) {
                alert("대댓글이 등록되었습니다.");
                window.location.reload();
            } else {
                alert("대댓글 등록에 실패했습니다.");
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="comment-item">
            <div className="comment-main">
                <div className="comment-author-box">
                    <span>{data.name}</span>
                </div>
                <div className="comment-content-box">
                    {isEditing ? (
                        <input
                            type="text"
                            className="comment-edit-input"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    ) : (
                        <span>{data.content}</span>
                    )}
                </div>
                <div className="comment-actions">
                     {isEditing ? (
                        <>
                            <Button text={"저장"} action={modifyComment} />
                            <Button text={"취소"} action={cancelEdit} />
                        </>
                    ) : (
                        <>
                            <Button text={"수정"} action={() => setIsEditing(true)} />
                            <Button text={"삭제"} action={deleteComment} />
                            <Button text={"댓글달기"} action={() => setIsReply(!isReply)} />
                        </>
                    )}
                </div>
            </div>

            {isReply && (
                <form className="reply-form" onSubmit={createReply}>
                    <input 
                        type="text" 
                        value={newReply} 
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="대댓글을 입력하세요"
                        required
                    />
                    <Button text={"저장"}/>
                    <Button text={"취소"} action={() => setIsReply(false)}/>
                </form>
            )}

            <div className="reply-list">
                {reply.map((item) => (
                    <Reply key={item.id} data={item}/>
                ))}
            </div>
        </div> 
    )
}