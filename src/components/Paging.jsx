import "@/style.css"

export default function Paging({text, action}) {

    return(
        <>
            <button id="paging" onClick={action}>{text}</button>
        </>
    )
}