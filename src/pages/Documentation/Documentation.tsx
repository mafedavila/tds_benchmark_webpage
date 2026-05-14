import { useMemo, useState } from "react";
import { Layout } from "../Layout";
import mockData from "./mock.json";
import computerImg from "../../assets/computer.jpg";
import diagramImg from "../../assets/diagram.svg";
import type { DocContentBlock, DocSection, ImageBlock } from "./types";

const sections = mockData as DocSection[];

const imageAssets = {
	computer: computerImg,
	diagram: diagramImg
};

const getImageSrc = (block: ImageBlock) => {
	if (block.src) {
		return block.src;
	}

	if (block.assetKey) {
		return imageAssets[block.assetKey];
	}

	return "";
};

const Documentation = () => {
	const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

	const activeSection = useMemo(
		() => sections.find((section) => section.id === activeId) ?? sections[0],
		[activeId]
	);

	const renderBlock = (block: DocContentBlock, index: number, sectionId: string) => {
		if (block.type === "heading") {
			if (block.level === 1) {
				return (
					<h1
						key={`${sectionId}-heading-${index}`}
						className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-8 mb-6"
					>
						{block.text}
					</h1>
				);
			}

			if (block.level === 2) {
				return (
					<h2
						key={`${sectionId}-heading-${index}`}
						className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-12 mb-4"
					>
						{block.text}
					</h2>
				);
			}

			return (
				<h3
					key={`${sectionId}-heading-${index}`}
					className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3"
				>
					{block.text}
				</h3>
			);
		}

		if (block.type === "paragraph") {
			return (
				<p
					key={`${sectionId}-paragraph-${index}`}
					className="text-gray-700 text-sm md:text-base leading-7"
				>
					{block.text}
				</p>
			);
		}

		if (block.type === "list") {
			const ListTag = block.style === "ordered" ? "ol" : "ul";
			const listClassName = block.style === "ordered" ? "list-decimal" : "list-disc";

			return (
				<ListTag
					key={`${sectionId}-list-${index}`}
					className={`${listClassName} list-inside space-y-3 text-gray-700 text-sm md:text-base leading-7`}
				>
					{block.items.map((item, itemIndex) => (
						<li key={`${sectionId}-list-item-${index}-${itemIndex}`}>
							{item}
						</li>
					))}
				</ListTag>
			);
		}

		if (block.type === "code") {
			return (
				<div
					key={`${sectionId}-code-${index}`}
					className="border border-gray-200 rounded-2xl overflow-hidden my-6"
				>
					<div className="px-4 py-2 bg-gray-100 text-xs text-gray-500 flex justify-between">
						<span>{block.title ?? "Code Example"}</span>
						<span>{block.language ?? "text"}</span>
					</div>

					<pre className="p-4 overflow-x-auto bg-[#0b1220] text-gray-100 text-xs md:text-sm leading-6">
						<code>{block.code}</code>
					</pre>
				</div>
			);
		}

		if (block.type === "image") {
			const src = getImageSrc(block);

			if (!src) {
				return null;
			}

			return (
				<figure
					key={`${sectionId}-image-${index}`}
					className="space-y-3 my-10"
				>
					<img
						src={src}
						alt={block.alt}
						className="w-full max-w-3xl rounded-2xl border border-gray-200 shadow-sm"
					/>

					{block.caption && (
						<figcaption className="text-sm text-gray-500">
							{block.caption}
						</figcaption>
					)}
				</figure>
			);
		}

		if (block.type === "note") {
			return (
				<div
					key={`${sectionId}-note-${index}`}
					className={`rounded-2xl p-5 text-sm md:text-base leading-7 my-6 ${
						block.variant === "warning"
							? "bg-amber-50 text-amber-900 border border-amber-200"
							: "bg-[#3A7F8F]/10 text-[#3A7F8F] border border-[#3A7F8F]/30"
					}`}
				>
					{block.text}
				</div>
			);
		}

		return null;
	};

	return (
		<Layout>
			<div className="w-full px-5 lg:px-18 py-10">
				<h1 className="text-3xl md:text-4xl font-bold text-text-blue mb-8">
					Documentation
				</h1>

				<div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col md:flex-row min-h-[620px]">
					<aside className="w-full md:w-[280px] border-r border-gray-200 bg-gray-50 p-4">
						<p className="text-xs uppercase tracking-[0.12em] text-gray-500 mb-3">
							Sections
						</p>

						<nav className="flex flex-col gap-2">
							{sections.map((section) => {
								const isActive = section.id === activeSection?.id;

								return (
									<button
										key={section.id}
										type="button"
										onClick={() => setActiveId(section.id)}
										className={`text-left w-full px-4 py-3 rounded-lg transition ${
											isActive
												? "bg-[#3A7F8F] text-white"
												: "bg-white text-gray-700 hover:bg-gray-100"
										}`}
									>
										{section.title}
									</button>
								);
							})}
						</nav>
					</aside>

					<main className="flex-1 p-6 md:p-10">
						{activeSection ? (
							<div className="max-w-4xl">
								<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
									{activeSection.title}
								</h2>

								<p className="text-lg text-gray-600 mt-3 mb-10 leading-8">
									{activeSection.summary}
								</p>

								<div className="space-y-6">
									{activeSection.content.map((block, index) =>
										renderBlock(block, index, activeSection.id)
									)}
								</div>
							</div>
						) : (
							<p className="text-gray-500">No documentation content available.</p>
						)}
					</main>
				</div>
			</div>
		</Layout>
	);
};

export default Documentation;