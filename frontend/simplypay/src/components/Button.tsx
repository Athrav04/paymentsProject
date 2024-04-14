import Rolling from "../assets/icons/Rolling@2x-1.0s-200px-200px.svg"
import spin from "../assets/icons/Spin@2x-1.0s-200px-200px.svg"
export default function Button({onClick,text,isDisabled}){
    return(
        <>
        <button className=" bg-gray-800 px-2 py-2 w-full rounded-lg text-white text-lg mt-2 cursor-pointer" onClick={onClick} disabled={isDisabled}>
            {text}
        </button>
        </>
    )
}