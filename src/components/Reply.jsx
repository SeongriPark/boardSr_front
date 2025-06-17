import Button from "./Button";
import React, { useState } from "react";

export default function Reply({data}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(data.content);

    // 대댓글 수정
    const modifyReply = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/comment/reply/update/${data.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editedContent }),
            });

            if (res.ok) {
                alert('대댓글이 수정되었습니다.');
                window.location.reload();
            } else {
                alert('대댓글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    };

    // 대댓글 삭제
    const deleteReply = async () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/comment/reply/delete/${data.id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    alert("대댓글이 삭제되었습니다.");
                    window.location.reload();
                } else {
                    alert("대댓글 삭제에 실패했습니다.");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditedContent(data.content);
    };

    return(
        <div className="reply-item">
             <div className="reply-author-box">
                <span>{data.name || 'ㄴ 익명댓글'}</span>
            </div>
            <div className="reply-content-box">
                {isEditing ? (
                    <input
                        type="text"
                        className="comment-edit-input"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                ) : (
                    <span>{data.content}</span>
                )}
            </div>
            <div className="reply-actions">
                {isEditing ? (
                    <>
                        <Button text={"저장"} action={modifyReply}/>
                        <Button text={"취소"} action={cancelEdit}/>
                    </>
                ) : (
                    <>
                        <Button text={"수정"} action={() => setIsEditing(true)}/>
                        <Button text={"삭제"} action={deleteReply}/>
                    </>
                )}
            </div>
        </div>
    )
}