
export const SkillCard = ({ title }: { title: string }) => {
    return (
        <div className="w-full h-20 min-w-[200px] border border-blue-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="flex justify-center items-center text-center font-semibold text-lg text-black h-full">{title}</h3>
        </div>
    )
}