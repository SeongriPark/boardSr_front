import "@/style.css"

export default function Button({text, action}) {

    return(
        <>
            <button id="button" type="submit" onClick={action}>{text}</button>
        </>
    )
}