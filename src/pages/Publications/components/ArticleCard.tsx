interface ArticleCardProps {
    title: string;
    publishedIn: string;
    year: number;
    description: string;
    href: string;
}

export default function ArticleCard({
    title,
    publishedIn,
    year,
    description,
    href,
    }: ArticleCardProps) {
    return (
        <div className="block w-full bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow" >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                {title}
            </h2>

            <p className="text-gray-500 mt-2">
                Published in <i>{publishedIn}</i>, {year}
            </p>

            <p className="text-gray-500 mt-2">
                {description}
            </p>
            {href !== "" && (
                <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"   
                className="mt-6 flex items-center text-text-blue font-medium"
                >
                    Read more
                    <span className="ml-2 text-xl">→</span>
                </a>
            )}
        </div>
    );
}
