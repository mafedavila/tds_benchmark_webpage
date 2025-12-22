import { Layout } from "../Layout";
import { SkillCard } from "./components/SkillCard";
import InfiniteScroll from "./components/InfiniteScroll";

const Curriculum = () => {
    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col items-center pt-10 pb-20 px-5 md:px-12 lg:px-20">
                <h1 className="text-3xl md:text-4xl font-bold text-text-blue mt-6 mb-12 text-center">
                    Academic Profile
                </h1>

                <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">

                    {/* Imagen responsive */}
                    <img 
                        src="src/assets/profile.jpg"
                        alt="Profile" 
                        className="w-44 h-44 md:w-60 md:h-60 object-cover rounded-lg shadow-lg"
                    />

                    {/* Descripción */}
                    <div className="flex flex-col w-full space-y-4">
                        <h2 className="font-bold text-3xl">Maria F. Davila R.</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I am a PhD candidate in Computer Science at the University of Oldenburg, specializing in tabular data synthesis with deep generative models.
                            <br /><br />
                            With a Master's degree in Renewable Energies and a Bachelor's in Mechanical Engineering, I combine a strong technical foundation with expertise in data analysis, energy efficiency, and sustainability.
                            <br /><br />
                            Over the past years, I have worked with large manufacturing companies, developing digital tools to optimize resource and energy consumption and sustainability. My passion lies in bridging computer science and mechanical engineering to drive the industry forward.
                        </p>
                    </div>
                </div>

                {/* EDUCATION */}
                <div className="w-full mt-12">
                    <h2 className="font-bold text-2xl mb-4">Education</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Ph.D in Computer Science, Carl von Ossietzky University of Oldenburg, current</li>
                        <li>M.S. in Renewable Energies, Carl von Ossietzky University of Oldenburg, 2020</li>
                        <li>B.S. in Mechanical Engineering, Los Andes University, 2016</li>
                    </ul>
                </div>

                <div className="border border-gray-300 w-full my-10" />

                {/* WORK EXPERIENCE */}
                <div className="w-full">
                    <h2 className="font-bold text-2xl mb-4">Work Experience</h2>
                    <ul className="space-y-5 text-gray-700">

                        {[  
                            { role: "Process and Data Manager", company: "EWE Gasspeicher Oldenburg", date: "06.2025 - Currently" },
                            { role: "Energy Efficiency Expert", company: "ArcelorMittal Bremen", date: "09.2024 - 05.2025" },
                            { role: "Researcher", company: "OFFIS Institute for Information Technology", date: "01.2022 - 08.2024" },
                            { role: "Researcher", company: "Carl von Ossietzky University of Oldenburg", date: "02.2021 - 12.2021" },
                            { role: "Research Assistant", company: "Fraunhofer IWES", date: "05.2020 - 01.2021" },
                            { role: "Reliability Engineer", company: "Occidental Petroleum Company", date: "08.2015 - 07.2018" },
                            { role: "Asset Integrity and Maintenance Intern", company: "Occidental Petroleum Company", date: "01.2015 - 07.2015" }
                        ].map((job) => (
                            <li key={job.role} className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                    <h4 className="font-bold text-black">{job.role}</h4>
                                    <p>{job.company}</p>
                                </div>
                                <p className="text-gray-700 mt-1 sm:mt-0">{job.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SKILLS */}
                <div className="w-full mt-14">
                    <h2 className="font-bold text-2xl mb-6">Skills</h2>

                    {/* Grupo 1 */}
                    <div className="mb-10">
                        <p className="mb-3 text-gray-800 font-medium">Datenanalyse, Cloud Computing, Database Management und FrontEnd</p>
                        <InfiniteScroll>
                            {[
                                "Advanced Python","Matlab","R","Docker","Kubernetes","InfluxDB",
                                "PostgreSQL","TimeScaleDB","Grafana","Elastic Stack",
                                "Angular - TypeScript","Computer Vision","Deep Generative Models"
                            ].map((skill) => (
                                <SkillCard key={skill} title={skill} />
                            ))}
                        </InfiniteScroll>
                    </div>

                    {/* Grupo 2 */}
                    <div className="mb-10">
                        <p className="mb-3 text-gray-800 font-medium">Modellierung, Simulation und Szenarioanalyse</p>
                        <InfiniteScroll>
                            {[
                                "OpenFOAM","ANSYS Fluent","ANSYS CFX","Autodesk CFD",
                                "Homer Pro","Simulink","PVSyst"
                            ].map((skill) => (
                                <SkillCard key={skill} title={skill} />
                            ))}
                        </InfiniteScroll>
                    </div>

                    {/* Grupo 3 */}
                    <div className="mb-10">
                        <p className="mb-3 text-gray-800 font-medium">Design und Computer-aided Design (CAD)</p>
                        <InfiniteScroll>
                            {[
                                "Autodesk Inventor","AutoCAD","FAST - OpenFAST",
                                "FLORIS","windPRO"
                            ].map((skill) => (
                                <SkillCard key={skill} title={skill} />
                            ))}
                        </InfiniteScroll>
                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default Curriculum;