import { Layout } from "../Layout"
import { GeneralUsersCard } from "./components/GeneralUsersCard"
import { TDSResearchersCard } from "./components/TdsResearchers"

const Synthesis = () => {
    return(
        <Layout>
            <div className="flex flex-col">
                <div className="self-center py-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-blue my-8 text-center">
                        Tabular Data Synthesis
                    </h1>
                    <p className="px-10">Let's get started — Select the role that best describes you</p>
                </div>
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-5 mb-10">
                    <GeneralUsersCard />
                    <TDSResearchersCard />
                </div>
            </div>
        </Layout>
    )
}

export default Synthesis;