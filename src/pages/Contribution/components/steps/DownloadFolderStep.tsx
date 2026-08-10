import JSZip from "jszip";

import { CodeBlock } from "../CodeBlock";
import { generateConfigJson } from "../../generators/configJson";
import { generatePythonVersionTxt } from "../../generators/pythonVersionTxt";
import { generateRequirementsTxt } from "../../generators/requirementsTxt";
import { generateRunToolPy } from "../../generators/runToolPy";
import { useContribution } from "../../store";

function normalizeToolName(toolName: string): string {
    return toolName.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "tool";
}

export function DownloadFolderStep() {
    const { state } = useContribution();
    const toolName = normalizeToolName(state.toolName);
    const configFileName = `${toolName}.json`;
    const zipFileName = `${toolName}-main.zip`;
    const requirementsTxt = generateRequirementsTxt(state);
    const pythonVersionTxt = generatePythonVersionTxt(state);
    const configJson = generateConfigJson(state);
    const runToolPy = generateRunToolPy(state);

    const downloadZip = async () => {
        const zip = new JSZip();
        zip.file("requirements.txt", requirementsTxt);
        zip.file("python-version.txt", pythonVersionTxt);
        zip.file(configFileName, configJson);
        zip.file("run_tool.py", runToolPy);

        if (state.needsSpecialTorch) {
            zip.file("special-torch.txt", state.specialTorchCommand.trim());
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = zipFileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{zipFileName}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Includes requirements, Python version, config JSON and run_tool.py.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={downloadZip}
                        className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
                    >
                        Download ZIP
                    </button>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock title="requirements.txt" language="txt" code={requirementsTxt} />
                <CodeBlock title="python-version.txt" language="txt" code={pythonVersionTxt} />
                {state.needsSpecialTorch ? (
                    <CodeBlock title="special-torch.txt" language="txt" code={state.specialTorchCommand.trim()} />
                ) : null}
                <CodeBlock title={configFileName} language="json" code={configJson} />
                <div className="lg:col-span-2">
                    <CodeBlock title="run_tool.py" language="python" code={runToolPy} />
                </div>
            </div>
        </div>
    );
}
