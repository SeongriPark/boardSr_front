import Link from "next/link";

export default function BoardItem({data}) {

    // <a> : 브라우저가 새로운 페이지를 완전히 새로고침하며 이동
    //       서버 요청이 발생하여 속도가 느리기 때문에 외부링크로 이동할 때 많이 사용된다.
    // <Link> : 페이지를 이동할 때 새로고침 없이 필요한 부분만 업데이트
    //          Next.js는 <Link>에 연결된 페이지를 미리 로드해서 더 빠르게 전환 가능 : 프리페칭
    return (
            <tr>
                <td>{data.id}</td>
                <td><Link href={`board/${data.id}`}>{data.title}</Link></td>
                <td>{data.name}</td>
                <td>{data.date}</td>
            </tr>
    )

}
