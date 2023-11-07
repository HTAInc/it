export default function MenuLabel(props) {
    return (
        <div className={`text-gray-400 px-4 text-sm font-light pt-4 inline-flex ${props.openSidebar && 'hidden'}`}>{props.text}</div>
    )
}