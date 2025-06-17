import "@/style.css"

export default function Button({text, action, type = 'submit', ...props}) {
    // ...props : 나머지 매개변수 문법으로 Button 컴포넌트를 사용하는 곳에서 어떤 HTML 속성이 필요한지 미리 다 알 수 없기 때문에 사용
    // disabled 나 id 속성등이 필요한 곳이 있을 수 있으므로 유연하게 사용 가능하다.

    return(
        <>
            <button className="button" type={type} onClick={action} {...props}>{text}</button>
        </>
    )
}