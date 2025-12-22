
export const Feature = ({img, title, description}: {img: string, title: string, description: string}) => {
    return (
        <div className="w-full max-w-[400px] h-full bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 hover:animate-pulse">
            <img src={img} className="w-full rounded-lg h-60"/>
            <div className="p-4 text-left space-y-2.5">
                <h3 className="text-xl text-text-blue font-semibold">{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}
