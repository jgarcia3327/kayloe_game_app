import PublicLayout from "@/Layouts/PublicLayout";

export default function Play({game}:any) {
    return (
        <PublicLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {game.title}
                        </h2>
                    }
                >
            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2>{game.title}</h2>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}