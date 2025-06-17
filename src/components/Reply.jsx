import Button from "./Button";
import React, { useState } from "react";

export default function Reply({data}) {

    const [newReply, setNewReply] = useState(data.content); // 수정된 대댓글
    const [isEditing, setIsEditing] = useState(false); // 대댓글 수정 상태 여부

    // 대댓글 수정
    const modifyReply = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/comment/reply/update/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newReply }),
            });

            if (res.ok) {
                alert('대댓글이 수정되었습니다.');
                setIsEditing(false);
                window.location.reload(true);
            } else {
                alert('대댓글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }
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
                    window.location.reload(true);
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
        setNewReply(data.content);
    };

    return(
        <tr>
            <td colSpan={3}>
                {isEditing ? (
                    <input
                        type="text"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                    />
                ) : (
                    "ㄴ " + data.content
                )}
            </td>
            {isEditing ? (
                <>
                    <td><Button text={"저장"} action={modifyReply}/></td>
                    <td><Button text={"취소"} action={cancelEdit}/></td>
                </>
            ) : (
                <>
                    <td><Button text={"수정"} action={() => setIsEditing(true)}/></td>
                    <td><Button text={"삭제"} action={deleteReply}/></td>
                </>
            )}
        </tr>
    )
}