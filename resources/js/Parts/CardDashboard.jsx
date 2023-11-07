export default function CardDashboard({className,title,subtitle, icon}) {
    return (
        <div className={`w-full h-24 group p-4 bg-gradient-to-tr rounded inline-flex justify-between items-center ${className}`}>
            <div className="flex flex-col justify-center">
                <div className="text-white font-semibold text-3xl">{title}</div>
                <div className="text-gray-50 text-sm font-light">{subtitle}</div>
            </div>
            <div className={`transition-all ease-in-out duration-300 text-4xl text-white group-hover:scale-125 ${icon}`}></div>
        </div>
    )
}